import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from '../../guards/jwt.guard';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { UpdateUserDto } from '@saraha/dto';

@Controller('users')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  /** GET /api/users/me */
  @Get('me')
  getProfile(@CurrentUser('sub') userId: string) {
    return this.userService.getProfile(userId);
  }

  /** PATCH /api/users/me */
  @Patch('me')
  updateProfile(@CurrentUser('sub') userId: string, @Body() dto: UpdateUserDto) {
    return this.userService.updateProfile(userId, dto);
  }
}
