import { describe, it, expect, beforeEach } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { MessageService } from './message.service';
import { PrismaService } from '@saraha/data-access';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { MessageFilter } from '@saraha/dto';

type UserFixture = {
  id: string;
  username: string;
};

type MessageFixture = {
  id: string;
  receiverId: string;
  content: string;
  isFavorite: boolean;
  isPublic: boolean;
  createdAt: Date;
  ipAddress?: string;
};

function createPrismaFixture(usersSeed: UserFixture[] = [], messagesSeed: MessageFixture[] = []) {
  const users = [...usersSeed];
  const messages = [...messagesSeed];

  return {
    user: {
      async findUnique(args: { where: { username?: string; id?: string } }) {
        const { username, id } = args.where;
        return users.find((user) => user.username === username || user.id === id) ?? null;
      },
    },
    message: {
      async create(args: { data: { content: string; ipAddress?: string; receiverId: string } }) {
        const message: MessageFixture = {
          id: `m-${messages.length + 1}`,
          content: args.data.content,
          ipAddress: args.data.ipAddress,
          receiverId: args.data.receiverId,
          isFavorite: false,
          isPublic: false,
          createdAt: new Date(),
        };
        messages.push(message);
        return { id: message.id, content: message.content, createdAt: message.createdAt };
      },
      async findMany(args: {
        where: { receiverId: string; isFavorite?: boolean; isPublic?: boolean };
        skip?: number;
        take?: number;
      }) {
        let result = messages.filter((message) => message.receiverId === args.where.receiverId);
        if (args.where.isFavorite !== undefined) {
          result = result.filter((message) => message.isFavorite === args.where.isFavorite);
        }
        if (args.where.isPublic !== undefined) {
          result = result.filter((message) => message.isPublic === args.where.isPublic);
        }
        const skip = args.skip ?? 0;
        const take = args.take ?? result.length;
        return result.slice(skip, skip + take);
      },
      async findUnique(args: { where: { id: string } }) {
        return messages.find((message) => message.id === args.where.id) ?? null;
      },
      async update(args: { where: { id: string }; data: { isFavorite?: boolean; isPublic?: boolean } }) {
        const idx = messages.findIndex((message) => message.id === args.where.id);
        if (idx < 0) throw new Error('Message not found');
        messages[idx] = { ...messages[idx], ...args.data };
        return messages[idx];
      },
      async delete(args: { where: { id: string } }) {
        const idx = messages.findIndex((message) => message.id === args.where.id);
        if (idx >= 0) messages.splice(idx, 1);
        return { id: args.where.id };
      },
      async count(args: { where: { receiverId: string; isFavorite?: boolean; isPublic?: boolean } }) {
        const filtered = await this.findMany({ where: args.where });
        return filtered.length;
      },
    },
  };
}

describe('MessageService', () => {
  let service: MessageService;
  let prismaFixture: ReturnType<typeof createPrismaFixture>;

  beforeEach(async () => {
    prismaFixture = createPrismaFixture(
      [{ id: 'user-1', username: 'testuser' }],
      [
        {
          id: 'msg-1',
          receiverId: 'user-1',
          content: 'Hello',
          isFavorite: false,
          isPublic: false,
          createdAt: new Date(),
        },
      ],
    );

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        { provide: PrismaService, useValue: prismaFixture },
      ],
    }).compile();

    service = module.get<MessageService>(MessageService);
  });

  describe('sendMessage', () => {
    it('should successfully send an anonymous message using AAA', async () => {
      // Arrange
      const username = 'testuser';
      const dto = { content: 'Hello from fixture' };
      const ipAddress = '127.0.0.1';

      // Act
      const result = await service.sendMessage(username, dto, ipAddress);

      // Assert
      expect(result).toHaveProperty('content', 'Hello from fixture');
    });

    it('should throw NotFoundException if user does not exist using AAA', async () => {
      // Arrange
      const username = 'invalid-user';

      // Act
      const action = service.sendMessage(username, { content: 'hi' });

      // Assert
      await expect(action).rejects.toThrow(NotFoundException);
    });
  });

  describe('getMessages', () => {
    it('should return paginated messages for a user using AAA', async () => {
      // Arrange
      const userId = 'user-1';
      const query = { filter: MessageFilter.ALL, page: 1, limit: 10 };

      // Act
      const result = await service.getMessages(userId, query);

      // Assert
      expect(result.meta.total).toBe(1);
      expect(result.data[0]?.id).toBe('msg-1');
    });
  });

  describe('toggleFavorite', () => {
    it('should update message favorite status if owner using AAA', async () => {
      // Arrange
      const userId = 'user-1';
      const messageId = 'msg-1';

      // Act
      const result = await service.toggleFavorite(userId, messageId, { value: true });

      // Assert
      expect(result.isFavorite).toBe(true);
    });

    it('should throw ForbiddenException if not the owner using AAA', async () => {
      // Arrange
      const userId = 'me';
      const messageId = 'msg-1';

      // Act
      const action = service.toggleFavorite(userId, messageId, { value: true });

      // Assert
      await expect(action).rejects.toThrow(ForbiddenException);
    });
  });
});
