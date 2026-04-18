import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtGuard } from '../../guards/jwt.guard';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { UpdateUserDto } from '@saraha/dto';
import { NotFoundException } from '@nestjs/common';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  const mockUserService = {
    getProfile: jest.fn(),
    updateProfile: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('getProfile', () => {
    it('should return user profile', async () => {
      // Arrange
      const userId = '1';
      const mockUser = {
        id: userId,
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        phone: '1234567890',
        role: 0,
        gender: 'male',
        profilePicture: 'http://example.com/pic.jpg',
        confirmEmail: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockUserService.getProfile.mockResolvedValue(mockUser);

      // Act
      const result = await controller.getProfile(userId);

      // Assert
      expect(mockUserService.getProfile).toHaveBeenCalledWith(userId);
      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException if user not found', async () => {
      // Arrange
      const userId = 'nonexistent';
      mockUserService.getProfile.mockRejectedValue(
        new NotFoundException('User not found'),
      );

      // Act & Assert
      await expect(controller.getProfile(userId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateProfile', () => {
    it('should update user profile and return updated fields', async () => {
      // Arrange
      const userId = '1';
      const updateData = {
        firstName: 'UpdatedFirst',
        lastName: 'UpdatedLast',
        phone: '0987654321',
      };
      const updatedUser = {
        id: userId,
        email: 'test@example.com',
        firstName: updateData.firstName,
        lastName: updateData.lastName,
        phone: updateData.phone,
        updatedAt: new Date(),
      };
      mockUserService.updateProfile.mockResolvedValue(updatedUser);

      // Act
      const result = await controller.updateProfile(userId, updateData);

      // Assert
      expect(mockUserService.updateProfile).toHaveBeenCalledWith(
        userId,
        updateData,
      );
      expect(result).toEqual(updatedUser);
    });
  });
});
