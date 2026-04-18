import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { SendMessageDto, MessageQueryDto, MessageFilter } from '@saraha/dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

describe('MessageController', () => {
  let controller: MessageController;
  let service: MessageService;

  const mockMessageService = {
    sendMessage: jest.fn(),
    getMessages: jest.fn(),
    toggleFavorite: jest.fn(),
    togglePublic: jest.fn(),
    deleteMessage: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessageController],
      providers: [
        { provide: MessageService, useValue: mockMessageService },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<MessageController>(MessageController);
    service = module.get<MessageService>(MessageService);
  });

  describe('sendMessage', () => {
    it('should successfully send a message using AAA', async () => {
      // Arrange
      const username = 'receiver';
      const dto: SendMessageDto = { content: 'Anonymous news' };
      const ip = '1.1.1.1';
      mockMessageService.sendMessage.mockResolvedValue({ id: 'm1', ...dto });

      // Act
      const result = await controller.sendMessage(username, dto, ip);

      // Assert
      expect(service.sendMessage).toHaveBeenCalledWith(username, dto, ip);
      expect(result.content).toBe(dto.content);
    });
  });

  describe('getMessages', () => {
    it('should retrieve personal messages using AAA', async () => {
      // Arrange
      const userId = 'u1';
      const query: MessageQueryDto = { filter: MessageFilter.ALL, page: 1, limit: 10 };
      const mockResponse = { data: [], meta: {} };
      mockMessageService.getMessages.mockResolvedValue(mockResponse);

      // Act
      const result = await controller.getMessages(userId, query);

      // Assert
      expect(service.getMessages).toHaveBeenCalledWith(userId, query);
      expect(result).toEqual(mockResponse);
    });
  });
});
