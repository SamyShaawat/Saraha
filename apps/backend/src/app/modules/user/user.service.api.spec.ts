import { describe, it, expect, beforeEach } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '@saraha/data-access';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';

type UserFixture = {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  bio?: string;
  role: number;
  profilePicture?: string;
  password?: string;
  createdAt: Date;
};

type MessageFixture = {
  id: string;
  receiverId: string;
  content: string;
  isPublic: boolean;
  createdAt: Date;
};

function createPrismaFixture(usersSeed: UserFixture[] = [], messagesSeed: MessageFixture[] = []) {
  const users = [...usersSeed];
  const messages = [...messagesSeed];

  return {
    user: {
      async findUnique(args: { where: { id?: string; username?: string } }) {
        const { id, username } = args.where;
        return users.find((user) => user.id === id || user.username === username) ?? null;
      },
      async update(args: { where: { id: string }; data: Partial<UserFixture> }) {
        const idx = users.findIndex((user) => user.id === args.where.id);
        if (idx < 0) throw new Error('User not found');
        users[idx] = { ...users[idx], ...args.data };
        return users[idx];
      },
      async delete(args: { where: { id: string } }) {
        const idx = users.findIndex((user) => user.id === args.where.id);
        if (idx >= 0) users.splice(idx, 1);
        return { id: args.where.id };
      },
    },
    message: {
      async findMany(args: { where: { receiverId: string; isPublic?: boolean } }) {
        return messages.filter((message) => {
          if (message.receiverId !== args.where.receiverId) return false;
          if (args.where.isPublic !== undefined) return message.isPublic === args.where.isPublic;
          return true;
        });
      },
    },
  };
}

describe('UserService', () => {
  let service: UserService;
  let prismaFixture: ReturnType<typeof createPrismaFixture>;

  beforeEach(async () => {
    prismaFixture = createPrismaFixture([
      {
        id: 'u1',
        username: 'samy',
        email: 'samy@test.com',
        firstName: 'Samy',
        lastName: 'Shaawat',
        role: 0,
        createdAt: new Date(),
      },
    ]);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: prismaFixture },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe('getMe', () => {
    it('should return user profile if found using AAA', async () => {
      // Arrange
      const userId = 'u1';

      // Act
      const result = await service.getMe(userId);

      // Assert
      expect(result.username).toBe('samy');
    });

    it('should throw NotFoundException if user not found using AAA', async () => {
      // Arrange
      const userId = 'ghost';

      // Act
      const action = service.getMe(userId);

      // Assert
      await expect(action).rejects.toThrow(NotFoundException);
    });
  });

  describe('changePassword', () => {
    it('should successfully change password with valid old password using AAA', async () => {
      // Arrange
      const userId = 'u1';
      const oldPass = 'old12345';
      const newPass = 'new12345';
      const hashedOld = await argon2.hash(oldPass);
      prismaFixture = createPrismaFixture([
        {
          id: 'u1',
          username: 'samy',
          email: 'samy@test.com',
          firstName: 'Samy',
          lastName: 'Shaawat',
          role: 0,
          password: hashedOld,
          createdAt: new Date(),
        },
      ]);
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          UserService,
          { provide: PrismaService, useValue: prismaFixture },
        ],
      }).compile();
      service = module.get<UserService>(UserService);

      // Act
      const result = await service.changePassword(userId, { old_password: oldPass, new_password: newPass });

      // Assert
      expect(result.success).toBe(true);
    });

    it('should throw UnauthorizedException for invalid old password using AAA', async () => {
      // Arrange
      const hashedOld = await argon2.hash('correct-password');
      prismaFixture = createPrismaFixture([
        {
          id: 'u1',
          username: 'samy',
          email: 'samy@test.com',
          firstName: 'Samy',
          lastName: 'Shaawat',
          role: 0,
          password: hashedOld,
          createdAt: new Date(),
        },
      ]);
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          UserService,
          { provide: PrismaService, useValue: prismaFixture },
        ],
      }).compile();
      service = module.get<UserService>(UserService);

      // Act
      const action = service.changePassword('u1', { old_password: 'wrong-password', new_password: 'new12345' });

      // Assert
      await expect(action).rejects.toThrow(UnauthorizedException);
    });
  });
});
