import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from '@saraha/dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
}
