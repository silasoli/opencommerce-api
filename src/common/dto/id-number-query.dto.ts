import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class IDNumberQueryDTO {
  @ApiProperty({ required: true, description: 'Send a valid ID' })
  @IsNotEmpty({ message: 'ID cannot be empty.' })
  @Type(() => Number)
  @IsNumber({}, { message: 'ID must be a number.' })
  id: number;
}
