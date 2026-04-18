import { IsEmail, IsString, IsOptional, MinLength, MaxLength, IsUrl, IsIn } from 'class-validator';

export const supportedLanguages = ['en', 'ar'] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(25)
  firstName!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(25)
  lastName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;
}

export class LoginDto {
  @IsString()
  email_or_username!: string; // Flexible login

  @IsString()
  @MinLength(8)
  password!: string;
}

export class FacebookAuthDto {
  @IsString()
  access_token!: string;
}

export class GoogleAuthDto {
  @IsString()
  access_token!: string;
}

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsUrl()
  @IsOptional()
  profilePicture?: string;
}

export class ChangePasswordDto {
  @IsString()
  @MinLength(8)
  old_password!: string;

  @IsString()
  @MinLength(8)
  new_password!: string;
}

export class UpdatePreferredLanguageDto {
  @IsString()
  @IsIn(supportedLanguages)
  language!: SupportedLanguage;
}
