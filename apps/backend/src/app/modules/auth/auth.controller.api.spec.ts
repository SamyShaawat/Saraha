/// <reference types="jest" />
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from '@saraha/dto';
import { ConflictException, UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    signup: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  describe('signup', () => {
    it('should call authService.signup and return result', async () => {
      // Arrange
      const dto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
        phone: '1234567890',
      };
      const result = { id: '1', email: dto.email };
      mockAuthService.signup.mockResolvedValue(result);

      // Act
      const response = await controller.signup(dto);

      // Assert
      expect(mockAuthService.signup).toHaveBeenCalledWith(dto);
      expect(response).toEqual(result);
    });

    it('should propagate ConflictException from authService', async () => {
      // Arrange
      const dto: CreateUserDto = {
        email: 'existing@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        phone: '1234567890',
      };
      mockAuthService.signup.mockRejectedValue(
        new ConflictException('Email already exists'),
      );

      // Act & Assert
      await expect(controller.signup(dto)).rejects.toThrow(ConflictException);
    });
  });

  describe('login', () => {
    it('should call authService.login and return result', async () => {
      // Arrange
      const dto: LoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };
      const result = { accessToken: 'token123', refreshToken: 'refresh123' };
      mockAuthService.login.mockResolvedValue(result);

      // Act
      const response = await controller.login(dto);

      // Assert
      expect(mockAuthService.login).toHaveBeenCalledWith(dto);
      expect(response).toEqual(result);
    });

    it('should propagate UnauthorizedException from authService', async () => {
      // Arrange
      const dto: LoginDto = {
        email: 'wrong@example.com',
        password: 'wrongpass',
      };
      mockAuthService.login.mockRejectedValue(
        new UnauthorizedException('Invalid credentials'),
      );

      // Act & Assert
      await expect(controller.login(dto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
