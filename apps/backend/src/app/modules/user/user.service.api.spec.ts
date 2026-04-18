import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '@saraha/data-access';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  const mockPrismaService: any = {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    message: {
      findMany: jest.fn(),
    }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('getMe', () => {
    it('should return user profile if found', async () => {
      // Arrange
      const userId = 'u1';
      mockPrismaService.user.findUnique.mockResolvedValue({ id: userId, username: 'samy' });

      // Act
      const result = await service.getMe(userId);

      // Assert
      expect(result.username).toBe('samy');
    });

    it('should throw NotFoundException if user not found', async () => {
      // Arrange
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      // Act & Assert
      await expect(service.getMe('ghost')).rejects.toThrow(NotFoundException);
    });
  });

  describe('changePassword', () => {
    it('should successfully change password with valid old password', async () => {
      // Arrange
      const userId = 'u1';
      const oldPass = 'old123';
      const newPass = 'new123';
      const hashedOld = await argon2.hash(oldPass);
      
      mockPrismaService.user.findUnique.mockResolvedValue({ id: userId, password: hashedOld });

      // Act
      const result = await service.changePassword(userId, { old_password: oldPass, new_password: newPass });

      // Assert
      expect(result.success).toBe(true);
      expect(prisma.user.update).toHaveBeenCalled();
    });

    it('should throw UnauthorizedException for invalid old password', async () => {
      // Arrange
      const hashedOld = await argon2.hash('correct');
      mockPrismaService.user.findUnique.mockResolvedValue({ id: 'u1', password: hashedOld });

      // Act & Assert
      await expect(service.changePassword('u1', { old_password: 'wrong', new_password: 'new' }))
        .rejects.toThrow(UnauthorizedException);
    });
  });
});
