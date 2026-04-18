import { Test, TestingModule } from '@nestjs/testing';
import { MessageService } from './message.service';
import { PrismaService } from '@saraha/data-access';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { MessageFilter } from '@saraha/dto';

describe('MessageService', () => {
  let service: MessageService;
  let prisma: PrismaService;

  const mockPrismaService = {
    user: {
      findUnique: jest.fn(),
    },
    message: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<MessageService>(MessageService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('sendMessage', () => {
    it('should successfully send an anonymous message', async () => {
      // Arrange
      const username = 'testuser';
      const dto = { content: 'Hello' };
      const ipAddress = '127.0.0.1';
      const mockUser = { id: 'user-1', username };
      
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      mockPrismaService.message.create.mockResolvedValue({ id: 'msg-1', ...dto });

      // Act
      const result = await service.sendMessage(username, dto, ipAddress);

      // Assert
      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { username } });
      expect(prisma.message.create).toHaveBeenCalled();
      expect(result).toHaveProperty('content', 'Hello');
    });

    it('should throw NotFoundException if user does not exist', async () => {
      // Arrange
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      // Act & Assert
      await expect(service.sendMessage('invalid', { content: 'hi' }))
        .rejects.toThrow(NotFoundException);
    });
  });

  describe('getMessages', () => {
    it('should return paginated messages for a user', async () => {
      // Arrange
      const userId = 'user-1';
      const query = { filter: MessageFilter.ALL, page: 1, limit: 10 };
      mockPrismaService.message.findMany.mockResolvedValue([{ id: 'm1' }]);
      mockPrismaService.message.count.mockResolvedValue(1);

      // Act
      const result = await service.getMessages(userId, query);

      // Assert
      expect(prisma.message.findMany).toHaveBeenCalled();
      expect(result.meta.total).toBe(1);
    });
  });

  describe('toggleFavorite', () => {
    it('should update message favorite status if owner', async () => {
      // Arrange
      const userId = 'user-1';
      const msgId = 'msg-1';
      mockPrismaService.message.findUnique.mockResolvedValue({ id: msgId, receiverId: userId });
      
      // Act
      await service.toggleFavorite(userId, msgId, { value: true });

      // Assert
      expect(prisma.message.update).toHaveBeenCalledWith({
        where: { id: msgId },
        data: { isFavorite: true }
      });
    });

    it('should throw ForbiddenException if not the owner', async () => {
      // Arrange
      mockPrismaService.message.findUnique.mockResolvedValue({ id: 'm1', receiverId: 'other' });

      // Act & Assert
      await expect(service.toggleFavorite('me', 'm1', { value: true }))
        .rejects.toThrow(ForbiddenException);
    });
  });
});
