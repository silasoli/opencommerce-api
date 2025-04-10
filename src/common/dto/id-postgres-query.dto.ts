import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class IDPostgresQueryDTO {
  @ApiProperty({ required: true, description: 'Send a valid ID' })
  @IsNotEmpty({ message: 'ID cannot be empty.' })
  @IsUUID(undefined, { message: 'ID must be an UUID.' })
  id: string;
}
