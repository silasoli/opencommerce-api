import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, MinLength } from 'class-validator';

export class CPFQueryDTO {
  @ApiProperty({ required: true, description: 'Send a valid CPF' })
  @IsNotEmpty({ message: 'CPF cannot be empty.' })
  @MinLength(11)
  @Type(() => String)
  cpf: string;
}
