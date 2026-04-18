import { IsString, IsBoolean, IsOptional, MaxLength, IsEnum, IsNumber, Min, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';

export class SendMessageDto {
  @IsString()
  @MaxLength(500)
  content!: string;
}

export class ToggleMessageStatusDto {
  @IsBoolean()
  value!: boolean;
}

export enum MessageFilter {
  ALL = 'all',
  FAVORITES = 'favorites',
  PUBLIC = 'public'
}

export class MessageQueryDto {
  @IsOptional()
  @IsEnum(MessageFilter)
  filter: MessageFilter = MessageFilter.ALL;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit = 20;
}

export class ContactDto {
  @IsString()
  @MaxLength(100)
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MaxLength(1000)
  message!: string;
}
