import { Controller, Get, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { GetUser } from '../../common/decorators/user.decorator';
import {
  UpdateProfileDto,
  ChangePasswordDto,
  UpdatePreferredLanguageDto,
} from '@saraha/dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /** GET /api/users/me (Protected) */
  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@GetUser('sub') userId: string) {
    return this.userService.getMe(userId);
  }

  /** PUT /api/users/me (Protected) */
  @Put('me')
  @UseGuards(JwtAuthGuard)
  updateProfile(@GetUser('sub') userId: string, @Body() dto: UpdateProfileDto) {
    return this.userService.updateProfile(userId, dto);
  }

  /** PUT /api/users/me/password (Protected) */
  @Put('me/password')
  @UseGuards(JwtAuthGuard)
  changePassword(@GetUser('sub') userId: string, @Body() dto: ChangePasswordDto) {
    return this.userService.changePassword(userId, dto);
  }

  /** DELETE /api/users/me (Protected) */
  @Delete('me')
  @UseGuards(JwtAuthGuard)
  deleteAccount(@GetUser('sub') userId: string) {
    return this.userService.deleteAccount(userId);
  }

  /** GET /api/users/me/language (Protected) */
  @Get('me/language')
  @UseGuards(JwtAuthGuard)
  getLanguagePreference(@GetUser('sub') userId: string) {
    return this.userService.getLanguagePreference(userId);
  }

  /** PUT /api/users/me/language (Protected) */
  @Put('me/language')
  @UseGuards(JwtAuthGuard)
  updateLanguagePreference(
    @GetUser('sub') userId: string,
    @Body() dto: UpdatePreferredLanguageDto,
  ) {
    return this.userService.updateLanguagePreference(userId, dto.language);
  }

  /** GET /api/users/:username/profile (Public) */
  @Get(':username/profile')
  getPublicProfile(@Param('username') username: string) {
    return this.userService.getPublicProfile(username);
  }

  /** GET /api/users/:username/public-messages (Public) */
  @Get(':username/public-messages')
  getPublicMessages(@Param('username') username: string) {
    // We can inject MessageService here or implement logic in UserService
    // For simplicity, let's keep it in UserService if possible, or just call MessageService
    // I'll add it to UserService for consistency in this file
    return this.userService.getPublicMessages(username);
  }
}
