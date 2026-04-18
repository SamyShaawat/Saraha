import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from '@saraha/dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService: any = {
    signup: jest.fn(),
    login: jest.fn(),
    facebookLogin: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('register/signup', () => {
    it('should successfully register a user using AAA', async () => {
      // Arrange
      const dto: CreateUserDto = {
        email: 'test@example.com',
        username: 'tester',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
      };
      const mockResult = { id: '1', ...dto };
      mockAuthService.signup.mockResolvedValue(mockResult);

      // Act
      const result = await controller.register(dto);

      // Assert
      expect(authService.signup).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockResult);
    });
  });

  describe('login', () => {
    it('should login and return tokens using AAA', async () => {
      // Arrange
      const dto: LoginDto = {
        email_or_username: 'tester',
        password: 'password123',
      };
      const mockTokens = { accessToken: 'jwt', user: { username: 'tester' } };
      mockAuthService.login.mockResolvedValue(mockTokens);

      // Act
      const result = await controller.login(dto);

      // Assert
      expect(authService.login).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockTokens);
    });
  });
});
