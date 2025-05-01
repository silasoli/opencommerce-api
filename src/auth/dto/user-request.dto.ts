import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class UserRequestDTO {
  @ApiProperty({ required: true, description: 'Envie um id válido' })
  @IsString({ message: 'O ID deve ser uma string.' })
  @IsNotEmpty({ message: 'O ID não pode estar vazio.' })
  // @IsMongoId({ message: 'O ID fornecido não está em um formato válido.' })
  @IsUUID(undefined, { message: 'ID must be an UUID.' })
  _id: string;
}
