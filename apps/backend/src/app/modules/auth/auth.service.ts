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
    const { email, password, firstName, lastName, phone } = dto;

    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) throw new ConflictException('Email already exists');

    const hashedPassword = password ? await argon2.hash(password) : undefined;

    const user = await this.prisma.user.create({
      data: { email, firstName, lastName, phone, password: hashedPassword },
      select: { id: true, email: true, firstName: true, lastName: true, role: true, createdAt: true },
    });

    return user;
  }

  async login(dto: LoginDto) {
    const { email, password } = dto;

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const valid = await argon2.verify(user.password, password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    return this.createTokens(user);
  }

  private createTokens(user: { id: string; role: number }) {
    const payload = { sub: user.id, role: user.role };
    const accessToken = jwt.sign(payload, process.env['JWT_SECRET'] ?? 'access-secret', {
      expiresIn: (process.env['JWT_EXPIRE'] as any) ?? '1d',
      audience: String(Role.User),
    });
    const refreshToken = jwt.sign(
      { sub: user.id },
      process.env['REFRESH_TOKEN_SECRET'] ?? 'refresh-secret',
      { expiresIn: (process.env['REFRESH_TOKEN_EXPIRE'] as any) ?? '7d' },
    );
    return { accessToken, refreshToken };
  }
}
