import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Users } from '../../database/entities/user.entity';

export class UserResponseDto {
  constructor(user: Users) {
    const { id, username, email } = user;

    return { id: String(id), username, email };
  }

  @ApiProperty({ required: true })
  id: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty({ message: 'É necessário informar o email do usuário.' })
  username: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'É necessário informar o email do usuário.' })
  @IsEmail({}, { message: 'O email informado deve ser válido' })
  email: string;
}
