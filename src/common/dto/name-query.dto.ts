import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class NameQueryDTO {
  @ApiProperty({ required: true, description: 'Send a valid Name' })
  @IsNotEmpty({ message: 'Name cannot be empty.' })
  @Type(() => String)
  name: string;
}
