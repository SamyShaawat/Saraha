import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@saraha/data-access';
import { Role } from '@saraha/utils';
import { CreateUserDto, LoginDto } from '@saraha/dto';
import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async signup(dto: CreateUserDto) {
    const { email, password, firstName, lastName, username } = dto;

    const existingEmail = await this.prisma.user.findUnique({ where: { email } });
    if (existingEmail) throw new ConflictException('Email already exists');

    const existingUser = await this.prisma.user.findUnique({ where: { username } });
    if (existingUser) throw new ConflictException('Username already taken');

    const hashedPassword = await argon2.hash(password);

    const user = await this.prisma.user.create({
      data: { email, firstName, lastName, username, password: hashedPassword },
      select: { id: true, email: true, username: true, firstName: true, lastName: true, role: true, createdAt: true },
    });

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
    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      ...tokens,
    };
  }

  async facebookLogin(_: string) {
     // TODO: Implement Facebook OAuth verification
     // For now, this is a placeholder
     throw new UnauthorizedException('Facebook login not implemented yet');
  }

  private createTokens(user: { id: string; role: number }) {
    const payload = { sub: user.id, role: user.role };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const expiresIn = (process.env['JWT_EXPIRE'] as any) ?? '1d';
    const accessToken = jwt.sign(payload, process.env['JWT_SECRET'] ?? 'access-secret', {
      expiresIn,
      audience: String(Role.User),
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const refreshExpiresIn = (process.env['REFRESH_TOKEN_EXPIRE'] as any) ?? '7d';
    const refreshToken = jwt.sign(
      { sub: user.id },
      process.env['REFRESH_TOKEN_SECRET'] ?? 'refresh-secret',
      { expiresIn: refreshExpiresIn },
    );
    return { accessToken, refreshToken };
  }
}
