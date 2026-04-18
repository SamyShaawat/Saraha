import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '@saraha/data-access';
import { ConflictException } from '@nestjs/common';
import { CreateUserDto } from '@saraha/dto';
import * as argon2 from 'argon2';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;

  const mockPrismaService = {
    user: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('signup', () => {
    it('should successfully register a new user using AAA', async () => {
      // Arrange
      const dto = { 
        email: 'new@test.com', 
        username: 'tester', 
        password: 'password123',
        firstName: 'Test',
        lastName: 'User'
      };
      mockPrismaService.user.findUnique.mockResolvedValue(null);
      mockPrismaService.user.create.mockResolvedValue({ id: 'u1', ...dto });

      // Act
      const result = await service.signup(dto);

      // Assert
      expect(prisma.user.create).toHaveBeenCalled();
      expect(result.username).toBe('tester');
    });

    it('should throw ConflictException if username already exists', async () => {
      // Arrange
      mockPrismaService.user.findUnique.mockImplementation(({ where }: { where: { username?: string; email?: string } }) => {
        if (where.username === 'taken') return { id: 'ext' };
        return null;
      });

      // Act & Assert
      await expect(service.signup({ username: 'taken' } as unknown as CreateUserDto))
        .rejects.toThrow(ConflictException);
    });
  });

  describe('login', () => {
    it('should return tokens for valid credentials (email or username)', async () => {
      // Arrange
      const pass = 'secret';
      const hash = await argon2.hash(pass);
      const mockUser = { id: 'u1', email: 'u@test.com', username: 'u', password: hash, role: 0 };
      mockPrismaService.user.findFirst.mockResolvedValue(mockUser);

      // Act
      const result = await service.login({ email_or_username: 'u', password: pass });

      // Assert
      expect(result).toHaveProperty('accessToken');
      expect(result.user.username).toBe('u');
    });
  });
});
