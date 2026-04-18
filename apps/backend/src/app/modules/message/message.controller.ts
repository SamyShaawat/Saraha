import {
  Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, 
  HttpCode, HttpStatus, Ip 
} from '@nestjs/common';
import { MessageService } from './message.service';
import { SendMessageDto, ToggleMessageStatusDto, MessageQueryDto } from '@saraha/dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { GetUser } from '../../common/decorators/user.decorator';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  /** POST /api/messages/:username (Public) */
  @Post(':username')
  @HttpCode(HttpStatus.CREATED)
  sendMessage(
    @Param('username') username: string,
    @Body() dto: SendMessageDto,
    @Ip() ip: string
  ) {
    return this.messageService.sendMessage(username, dto, ip);
  }

  /** GET /api/messages (Protected) */
  @Get()
  @UseGuards(JwtAuthGuard)
  getMessages(
    @GetUser('sub') userId: string,
    @Query() query: MessageQueryDto
  ) {
    return this.messageService.getMessages(userId, query);
  }

  /** PUT /api/messages/:messageId/favorite (Protected) */
  @Put(':id/favorite')
  @UseGuards(JwtAuthGuard)
  toggleFavorite(
    @GetUser('sub') userId: string,
    @Param('id') messageId: string,
    @Body() dto: ToggleMessageStatusDto
  ) {
    return this.messageService.toggleFavorite(userId, messageId, dto);
  }

  /** PUT /api/messages/:messageId/public (Protected) */
  @Put(':id/public')
  @UseGuards(JwtAuthGuard)
  togglePublic(
    @GetUser('sub') userId: string,
    @Param('id') messageId: string,
    @Body() dto: ToggleMessageStatusDto
  ) {
    return this.messageService.togglePublic(userId, messageId, dto);
  }

  /** DELETE /api/messages/:messageId (Protected) */
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteMessage(
    @GetUser('sub') userId: string,
    @Param('id') messageId: string
  ) {
    return this.messageService.deleteMessage(userId, messageId);
  }
}
