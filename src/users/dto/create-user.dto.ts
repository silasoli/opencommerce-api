import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsPostalCode,
  IsString,
  IsTaxId,
  ValidateNested,
} from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({ required: true })
  @IsString()
  address: string;

  @ApiProperty({ required: true })
  @IsString()
  addressNumber: string;

  @ApiProperty({ required: true })
  @IsString()
  complement?: string;

  @ApiProperty({ required: true })
  @IsString()
  province: string;

  @ApiProperty({ required: true })
  @IsString()
  city: string;

  @ApiProperty({ required: true })
  @IsString()
  state: string;

  @ApiProperty({ required: true })
  @IsPostalCode('BR')
  postalCode: string;
}

export class CreateUserDto {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'É necessário informar o nome do usuário.' })
  username: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'É necessário informar o email do usuário.' })
  @IsEmail({}, { message: 'O email informado deve ser válido' })
  email: string;

  @ApiProperty({ required: true })
  @IsTaxId('pt-BR', { message: 'O número de CPF ou CNPJ é inválido.' })
  cpfCnpj: string;

  @ApiProperty({ required: true })
  @IsMobilePhone(
    'pt-BR',
    { strictMode: true },
    { message: 'Telefone inválido.' },
  )
  mobilePhone: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'É necessário informar o password do usuário.' })
  password: string;

  @ApiProperty({ required: true })
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}
