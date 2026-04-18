import { describe, it, expect, beforeEach } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { SendMessageDto, MessageQueryDto, MessageFilter } from '@saraha/dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

class MessageServiceFixture {
  public lastSendCall: { username: string; dto: SendMessageDto; ip: string } | null = null;
  public lastGetMessagesCall: { userId: string; query: MessageQueryDto } | null = null;

  async sendMessage(username: string, dto: SendMessageDto, ip: string) {
    this.lastSendCall = { username, dto, ip };
    return { id: 'm1', ...dto };
  }

  async getMessages(userId: string, query: MessageQueryDto) {
    this.lastGetMessagesCall = { userId, query };
    return { data: [], meta: {} };
  }

  async toggleFavorite() {
    return { success: true };
  }

  async togglePublic() {
    return { success: true };
  }

  async deleteMessage() {
    return { success: true };
  }
}

describe('MessageController', () => {
  let controller: MessageController;
  let fixture: MessageServiceFixture;

  beforeEach(async () => {
    fixture = new MessageServiceFixture();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessageController],
      providers: [
        { provide: MessageService, useValue: fixture },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<MessageController>(MessageController);
  });

  describe('sendMessage', () => {
    it('should successfully send a message using AAA', async () => {
      // Arrange
      const username = 'receiver';
      const dto: SendMessageDto = { content: 'Anonymous news' };
      const ip = '1.1.1.1';

      // Act
      const result = await controller.sendMessage(username, dto, ip);

      // Assert
      expect(fixture.lastSendCall).toEqual({ username, dto, ip });
      expect(result.content).toBe(dto.content);
    });
  });

  describe('getMessages', () => {
    it('should retrieve personal messages using AAA', async () => {
      // Arrange
      const userId = 'u1';
      const query: MessageQueryDto = { filter: MessageFilter.ALL, page: 1, limit: 10 };

      // Act
      const result = await controller.getMessages(userId, query);

      // Assert
      expect(fixture.lastGetMessagesCall).toEqual({ userId, query });
      expect(result).toEqual({ data: [], meta: {} });
    });
  });
});
