import { describe, it, expect, beforeEach } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto, FacebookAuthDto, GoogleAuthDto } from '@saraha/dto';

class AuthServiceFixture {
  public lastSignupDto: CreateUserDto | null = null;
  public lastLoginDto: LoginDto | null = null;
  public lastFacebookSignupToken: string | null = null;
  public lastFacebookLoginToken: string | null = null;
  public lastGoogleSignupToken: string | null = null;
  public lastGoogleLoginToken: string | null = null;

  public signupResult = {
    id: 'user-1',
    email: 'test@example.com',
    username: 'tester',
    firstName: 'Test',
    lastName: 'User',
  };

  public loginResult = {
    accessToken: 'jwt-token',
    refreshToken: 'refresh-token',
    user: { username: 'tester' },
  };

  async signup(dto: CreateUserDto) {
    this.lastSignupDto = dto;
    return this.signupResult;
  }

  async login(dto: LoginDto) {
    this.lastLoginDto = dto;
    return this.loginResult;
  }

  async facebookSignup(token: string) {
    this.lastFacebookSignupToken = token;
    return this.loginResult;
  }

  async facebookLogin(token: string) {
    this.lastFacebookLoginToken = token;
    return this.loginResult;
  }

  async googleSignup(token: string) {
    this.lastGoogleSignupToken = token;
    return this.loginResult;
  }

  async googleLogin(token: string) {
    this.lastGoogleLoginToken = token;
    return this.loginResult;
  }
}

describe('AuthController', () => {
  let controller: AuthController;
  let fixture: AuthServiceFixture;

  beforeEach(async () => {
    fixture = new AuthServiceFixture();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: fixture }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
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

      // Act
      const result = await controller.register(dto);

      // Assert
      expect(fixture.lastSignupDto).toEqual(dto);
      expect(result).toEqual(fixture.signupResult);
    });
  });

  describe('login', () => {
    it('should login and return tokens using AAA', async () => {
      // Arrange
      const dto: LoginDto = {
        email_or_username: 'tester',
        password: 'password123',
      };

      // Act
      const result = await controller.login(dto);

      // Assert
      expect(fixture.lastLoginDto).toEqual(dto);
      expect(result).toEqual(fixture.loginResult);
    });
  });

  describe('facebook social auth', () => {
    it('should signup with facebook token using AAA', async () => {
      // Arrange
      const dto: FacebookAuthDto = { access_token: 'fb-token' };

      // Act
      const result = await controller.facebookSignup(dto);

      // Assert
      expect(fixture.lastFacebookSignupToken).toBe('fb-token');
      expect(result).toEqual(fixture.loginResult);
    });

    it('should login with facebook token using AAA', async () => {
      // Arrange
      const dto: FacebookAuthDto = { access_token: 'fb-token' };

      // Act
      const result = await controller.facebookLogin(dto);

      // Assert
      expect(fixture.lastFacebookLoginToken).toBe('fb-token');
      expect(result).toEqual(fixture.loginResult);
    });
  });

  describe('google social auth', () => {
    it('should signup with google token using AAA', async () => {
      // Arrange
      const dto: GoogleAuthDto = { access_token: 'google-token' };

      // Act
      const result = await controller.googleSignup(dto);

      // Assert
      expect(fixture.lastGoogleSignupToken).toBe('google-token');
      expect(result).toEqual(fixture.loginResult);
    });

    it('should login with google token using AAA', async () => {
      // Arrange
      const dto: GoogleAuthDto = { access_token: 'google-token' };

      // Act
      const result = await controller.googleLogin(dto);

      // Assert
      expect(fixture.lastGoogleLoginToken).toBe('google-token');
      expect(result).toEqual(fixture.loginResult);
    });
  });
});
