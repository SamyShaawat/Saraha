import { describe, it, expect, beforeEach } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '@saraha/data-access';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '@saraha/dto';
import * as argon2 from 'argon2';
import { Provider } from '@saraha/utils';
import { SocialAuthVerifier } from './social-auth.verifier';

type UserFixture = {
  id: string;
  email: string;
  username: string;
  password?: string;
  firstName: string;
  lastName: string;
  role: number;
  provider: number;
  createdAt: Date;
};

class SocialAuthVerifierFixture {
  public googleProfile = {
    email: 'google.user@test.com',
    firstName: 'Google',
    lastName: 'User',
  };

  public facebookProfile = {
    email: 'facebook.user@test.com',
    firstName: 'Facebook',
    lastName: 'User',
  };

  async verifyGoogleToken() {
    return this.googleProfile;
  }

  async verifyFacebookToken() {
    return this.facebookProfile;
  }
}

function createPrismaFixture(initialUsers: UserFixture[] = []) {
  const users: UserFixture[] = [...initialUsers];

  return {
    user: {
      async findUnique(args: { where: { email?: string; username?: string; id?: string } }) {
        const { email, username, id } = args.where;
        return (
          users.find((user) => user.email === email || user.username === username || user.id === id) ?? null
        );
      },
      async findFirst(args: { where: { OR: Array<{ email?: string; username?: string }> } }) {
        return (
          users.find((user) =>
            args.where.OR.some((condition) => {
              if (condition.email) return user.email === condition.email;
              if (condition.username) return user.username === condition.username;
              return false;
            }),
          ) ?? null
        );
      },
      async create(args: {
        data: Omit<UserFixture, 'id' | 'role' | 'createdAt' | 'provider'> & { provider?: number };
        select?: Record<string, boolean>;
      }) {
        const user: UserFixture = {
          id: `u-${users.length + 1}`,
          role: 0,
          provider: args.data.provider ?? Provider.System,
          createdAt: new Date(),
          ...args.data,
        };
        users.push(user);

        if (!args.select) return user;

        const selected = Object.entries(args.select)
          .filter(([, enabled]) => enabled)
          .reduce<Record<string, unknown>>((acc, [key]) => {
            acc[key] = user[key as keyof UserFixture];
            return acc;
          }, {});

        return selected;
      },
    },
  };
}

describe('AuthService', () => {
  let service: AuthService;
  let prismaFixture: ReturnType<typeof createPrismaFixture>;
  let socialVerifierFixture: SocialAuthVerifierFixture;

  beforeEach(async () => {
    prismaFixture = createPrismaFixture();
    socialVerifierFixture = new SocialAuthVerifierFixture();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: prismaFixture },
        { provide: SocialAuthVerifier, useValue: socialVerifierFixture },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('signup', () => {
    it('should successfully register a new user using AAA', async () => {
      // Arrange
      const dto: CreateUserDto = {
        email: 'new@test.com',
        username: 'tester',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
      };

      // Act
      const result = await service.signup(dto);

      // Assert
      expect(result.username).toBe('tester');
      expect(result.email).toBe('new@test.com');
    });

    it('should throw ConflictException if username already exists using AAA', async () => {
      // Arrange
      prismaFixture = createPrismaFixture([
        {
          id: 'u-existing',
          email: 'existing@test.com',
          username: 'taken',
          password: 'hashed',
          firstName: 'Existing',
          lastName: 'User',
          role: 0,
          provider: Provider.System,
          createdAt: new Date(),
        },
      ]);
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AuthService,
          { provide: PrismaService, useValue: prismaFixture },
          { provide: SocialAuthVerifier, useValue: socialVerifierFixture },
        ],
      }).compile();
      service = module.get<AuthService>(AuthService);

      // Act
      const action = service.signup({
        email: 'new@test.com',
        username: 'taken',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
      });

      // Assert
      await expect(action).rejects.toThrow(ConflictException);
    });
  });

  describe('login', () => {
    it('should return tokens for valid credentials (email or username) using AAA', async () => {
      // Arrange
      const pass = 'secret123';
      const hash = await argon2.hash(pass);
      prismaFixture = createPrismaFixture([
        {
          id: 'u1',
          email: 'u@test.com',
          username: 'u',
          password: hash,
          firstName: 'U',
          lastName: 'Tester',
          role: 0,
          provider: Provider.System,
          createdAt: new Date(),
        },
      ]);
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AuthService,
          { provide: PrismaService, useValue: prismaFixture },
          { provide: SocialAuthVerifier, useValue: socialVerifierFixture },
        ],
      }).compile();
      service = module.get<AuthService>(AuthService);

      // Act
      const result = await service.login({ email_or_username: 'u', password: pass });

      // Assert
      expect(result).toHaveProperty('accessToken');
      expect(result.user.username).toBe('u');
    });
  });

  describe('google social auth', () => {
    it('should signup with google and create a persisted user using AAA', async () => {
      // Arrange
      socialVerifierFixture.googleProfile = {
        email: 'new.google@test.com',
        firstName: 'New',
        lastName: 'Google',
      };

      // Act
      const result = await service.googleSignup('token-value');

      // Assert
      expect(result).toHaveProperty('accessToken');
      expect(result.user.email).toBe('new.google@test.com');
    });

    it('should login with google for existing social account using AAA', async () => {
      // Arrange
      prismaFixture = createPrismaFixture([
        {
          id: 'g1',
          email: 'google.user@test.com',
          username: 'google_user',
          firstName: 'Google',
          lastName: 'User',
          role: 0,
          provider: Provider.Google,
          createdAt: new Date(),
        },
      ]);
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AuthService,
          { provide: PrismaService, useValue: prismaFixture },
          { provide: SocialAuthVerifier, useValue: socialVerifierFixture },
        ],
      }).compile();
      service = module.get<AuthService>(AuthService);

      // Act
      const result = await service.googleLogin('token-value');

      // Assert
      expect(result).toHaveProperty('accessToken');
      expect(result.user.email).toBe('google.user@test.com');
    });

    it('should reject google login if account does not exist using AAA', async () => {
      // Arrange
      socialVerifierFixture.googleProfile = {
        email: 'missing@test.com',
        firstName: 'Missing',
        lastName: 'User',
      };

      // Act
      const action = service.googleLogin('token-value');

      // Assert
      await expect(action).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('facebook social auth', () => {
    it('should signup with facebook and create a persisted user using AAA', async () => {
      // Arrange
      socialVerifierFixture.facebookProfile = {
        email: 'new.facebook@test.com',
        firstName: 'New',
        lastName: 'Facebook',
      };

      // Act
      const result = await service.facebookSignup('token-value');

      // Assert
      expect(result).toHaveProperty('accessToken');
      expect(result.user.email).toBe('new.facebook@test.com');
    });
  });
});
