import { Controller, Post, Body, HttpCode, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto, FacebookAuthDto, GoogleAuthDto } from '@saraha/dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /** POST /api/auth/register */
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() dto: CreateUserDto) {
    return this.authService.signup(dto);
  }

  /** POST /api/auth/signup */
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() dto: CreateUserDto) {
    return this.authService.signup(dto);
  }

  /** POST /api/auth/login */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  /** POST /api/auth/facebook */
  @Post('facebook/signup')
  @HttpCode(HttpStatus.OK)
  facebookSignup(@Body() dto: FacebookAuthDto) {
    return this.authService.facebookSignup(dto.access_token);
  }

  /** POST /api/auth/facebook/login */
  @Post('facebook/login')
  @HttpCode(HttpStatus.OK)
  facebookLogin(@Body() dto: FacebookAuthDto) {
    return this.authService.facebookLogin(dto.access_token);
  }

  /** POST /api/auth/google/signup */
  @Post('google/signup')
  @HttpCode(HttpStatus.OK)
  googleSignup(@Body() dto: GoogleAuthDto) {
    return this.authService.googleSignup(dto.access_token);
  }

  /** POST /api/auth/google/login */
  @Post('google/login')
  @HttpCode(HttpStatus.OK)
  googleLogin(@Body() dto: GoogleAuthDto) {
    return this.authService.googleLogin(dto.access_token);
  }

  /** POST /api/auth/refresh */
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh(@Body('refresh_token') token: string) {
    if (!token) throw new UnauthorizedException('Refresh token is required');
    return this.authService.refreshToken(token);
  }
}
