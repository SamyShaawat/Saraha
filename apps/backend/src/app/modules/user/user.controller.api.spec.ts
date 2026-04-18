import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UpdateProfileDto } from '@saraha/dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  const mockUserService: any = {
    getMe: jest.fn(),
    updateProfile: jest.fn(),
    deleteAccount: jest.fn(),
    changePassword: jest.fn(),
    getPublicProfile: jest.fn(),
    getPublicMessages: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: mockUserService },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('getMe', () => {
    it('should return user profile successfully using AAA', async () => {
      // Arrange
      const userId = 'user-1';
      const mockProfile = { id: userId, username: 'samy' };
      mockUserService.getMe.mockResolvedValue(mockProfile);

      // Act
      const result = await controller.getMe(userId);

      // Assert
      expect(userService.getMe).toHaveBeenCalledWith(userId);
      expect(result).toEqual(mockProfile);
    });
  });

  describe('updateProfile', () => {
    it('should update profile using AAA', async () => {
      // Arrange
      const userId = 'user-1';
      const dto: UpdateProfileDto = { firstName: 'Samy' };
      mockUserService.updateProfile.mockResolvedValue({ id: userId, ...dto });

      // Act
      const result = await controller.updateProfile(userId, dto);

      // Assert
      expect(userService.updateProfile).toHaveBeenCalledWith(userId, dto);
      expect(result.firstName).toBe('Samy');
    });
  });
});
