import { Injectable, ConflictException, UnauthorizedException, Logger } from '@nestjs/common';
import { PrismaService } from '@saraha/data-access';
import { Role, Provider } from '@saraha/utils';
import { CreateUserDto, LoginDto } from '@saraha/dto';
import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
import { SocialAuthVerifier, SocialProfile } from './social-auth.verifier';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly socialAuthVerifier: SocialAuthVerifier,
  ) {}

  async signup(dto: CreateUserDto) {
    const { email, password, firstName, lastName, username } = dto;

    const existingEmail = await this.prisma.user.findUnique({ where: { email } });
    if (existingEmail) throw new ConflictException('Email already exists');

    const existingUser = await this.prisma.user.findUnique({ where: { username } });
    if (existingUser) throw new ConflictException('Username already taken');

    const hashedPassword = await argon2.hash(password);

    const user = await this.prisma.user.create({
      data: { email, firstName, lastName, username, password: hashedPassword },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        role: true,
        preferredLanguage: true,
        createdAt: true,
      },
    });

    this.logger.log(`User created: ${user.username} (${user.id})`);

    return user;
  }

  async login(dto: LoginDto) {
    const { email_or_username, password } = dto;

    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: email_or_username },
          { username: email_or_username },
        ],
      },
    });

    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const valid = await argon2.verify(user.password, password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const tokens = this.createTokens(user);
    const response = {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        preferredLanguage: user.preferredLanguage,
      },
      ...tokens,
    };

    this.logger.log(`User logged in: ${user.username} (${user.id})`);

    return response;
  }

  async refreshToken(token: string) {
    try {
      const payload = jwt.verify(
        token,
        process.env['REFRESH_TOKEN_SECRET'] ?? 'refresh-secret'
      ) as { sub: string };
      
      const user = await this.prisma.user.findUnique({ where: { id: payload.sub } });
      if (!user) throw new UnauthorizedException('Invalid session');
      
      return this.createTokens(user);
    } catch (e) {
      throw new UnauthorizedException('Session expired');
    }
  }

  async facebookSignup(token: string) {
    const profile = await this.socialAuthVerifier.verifyFacebookToken(token);
    return this.socialSignup(profile, Provider.Facebook);
  }

  async facebookLogin(token: string) {
    const profile = await this.socialAuthVerifier.verifyFacebookToken(token);
    return this.socialLogin(profile, Provider.Facebook);
  }

  async googleSignup(token: string) {
    const profile = await this.socialAuthVerifier.verifyGoogleToken(token);
    return this.socialSignup(profile, Provider.Google);
  }

  async googleLogin(token: string) {
    const profile = await this.socialAuthVerifier.verifyGoogleToken(token);
    return this.socialLogin(profile, Provider.Google);
  }

  private async socialSignup(profile: SocialProfile, provider: Provider) {
    const existingByEmail = await this.prisma.user.findUnique({ where: { email: profile.email } });
    if (existingByEmail) {
      if (existingByEmail.provider !== provider) {
        throw new ConflictException('Email already used with another provider');
      }
      return this.createAuthResponse(existingByEmail);
    }

    const username = await this.generateUniqueUsername(profile.email);
    const created = await this.prisma.user.create({
      data: {
        email: profile.email,
        username,
        firstName: profile.firstName,
        lastName: profile.lastName,
        provider,
      },
    });

    this.logger.log(`Social user created: ${created.username} (${created.id})`);
    return this.createAuthResponse(created);
  }

  private async socialLogin(profile: SocialProfile, provider: Provider) {
    const existingByEmail = await this.prisma.user.findUnique({ where: { email: profile.email } });
    if (!existingByEmail || existingByEmail.provider !== provider) {
      throw new UnauthorizedException('Social account not registered, please signup first');
    }

    return this.createAuthResponse(existingByEmail);
  }

  private async generateUniqueUsername(email: string) {
    const localPart = email.split('@')[0].toLowerCase();
    const sanitized = localPart.replace(/[^a-z0-9_.-]/g, '').slice(0, 16) || 'user';

    let candidate = sanitized;
    let suffix = 1;
    while (await this.prisma.user.findUnique({ where: { username: candidate } })) {
      candidate = `${sanitized.slice(0, 12)}_${suffix}`;
      suffix += 1;
    }
    return candidate;
  }

  private createAuthResponse(user: {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    role: number;
    preferredLanguage?: string;
  }) {
    const tokens = this.createTokens(user);
    const response = {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        preferredLanguage: user.preferredLanguage,
      },
      ...tokens,
    };

    this.logger.log(`User authenticated: ${user.username} (${user.id})`);
    return response;
  }

  private createTokens(user: { id: string; role: number }) {
    const payload = { sub: user.id, role: user.role };
    // Access token valid for 1h
    const expiresIn = (process.env['JWT_EXPIRE'] ?? '1h') as jwt.SignOptions['expiresIn'];
    const accessToken = jwt.sign(payload, process.env['JWT_SECRET'] ?? 'access-secret', {
      expiresIn,
      audience: String(Role.User),
    });

    // Refresh token valid for 3h (as per user request)
    const refreshExpiresIn = (process.env['REFRESH_TOKEN_EXPIRE'] ?? '3h') as jwt.SignOptions['expiresIn'];
    const refreshToken = jwt.sign(
      { sub: user.id },
      process.env['REFRESH_TOKEN_SECRET'] ?? 'refresh-secret',
      { expiresIn: refreshExpiresIn },
    );
    return { accessToken, refreshToken };
  }
}
