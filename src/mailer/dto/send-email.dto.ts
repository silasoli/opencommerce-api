import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsObject,
  IsOptional,
} from 'class-validator';

export class SendEmailDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  to: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsObject()
  @IsNotEmpty()
  variables: Record<string, any>;

  @IsOptional()
  attachments?: Array<{ filename: string; path: string }>;
}
