import { describe, it, expect, beforeEach } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UpdateProfileDto } from '@saraha/dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

class UserServiceFixture {
  public lastGetMeUserId: string | null = null;
  public lastUpdateCall: { userId: string; dto: UpdateProfileDto } | null = null;

  async getMe(userId: string) {
    this.lastGetMeUserId = userId;
    return { id: userId, username: 'samy' };
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    this.lastUpdateCall = { userId, dto };
    return { id: userId, ...dto };
  }

  async deleteAccount(userId: string) {
    return { success: true, userId };
  }

  async changePassword(userId: string, dto: { old_password: string; new_password: string }) {
    return { success: true, userId, dto };
  }

  async getPublicProfile(username: string) {
    return { username };
  }

  async getPublicMessages(username: string) {
    return [{ id: 'm1', username }];
  }
}

describe('UserController', () => {
  let controller: UserController;
  let fixture: UserServiceFixture;

  beforeEach(async () => {
    fixture = new UserServiceFixture();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: fixture },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<UserController>(UserController);
  });

  describe('getMe', () => {
    it('should return user profile successfully using AAA', async () => {
      // Arrange
      const userId = 'user-1';

      // Act
      const result = await controller.getMe(userId);

      // Assert
      expect(fixture.lastGetMeUserId).toBe(userId);
      expect(result).toEqual({ id: userId, username: 'samy' });
    });
  });

  describe('updateProfile', () => {
    it('should update profile using AAA', async () => {
      // Arrange
      const userId = 'user-1';
      const dto: UpdateProfileDto = { firstName: 'Samy' };

      // Act
      const result = await controller.updateProfile(userId, dto);

      // Assert
      expect(fixture.lastUpdateCall).toEqual({ userId, dto });
      expect(result.firstName).toBe('Samy');
    });
  });
});
