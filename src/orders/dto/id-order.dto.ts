import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class IDOrderDTO {
  @ApiProperty({ required: true, description: 'Envie um id válido' })
  @IsNotEmpty({ message: 'O ID não pode estar vazio.' })
  @IsNumber()
  id: number;
}
