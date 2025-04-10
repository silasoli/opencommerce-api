import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class PhoneQueryDTO {
  @ApiProperty({ required: true, description: 'Send a valid Phone' })
  @IsNotEmpty({ message: 'Phone cannot be empty.' })
  @Type(() => String)
  @Transform(({ value }) => value.replace(/[^\d]+/g, ''))
  phone: string;
}
