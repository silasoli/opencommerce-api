import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ILoginPayload } from '../interfaces/IPayload.interface';

export class UserLoginResponseDto {
  constructor(user: ILoginPayload) {
    const { id, username, email, access_token, roles } = user;

    return { id: String(id), username, email, access_token, roles };
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

  @ApiProperty({ required: true })
  access_token: string;

  @ApiProperty({ required: true })
  roles: string[];
}
