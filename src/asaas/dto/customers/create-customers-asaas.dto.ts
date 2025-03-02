import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsMobilePhone,
  IsPostalCode,
  IsString,
  IsTaxId,
  MinLength,
} from 'class-validator';

export class CreateCustomerAsaasDto {
  @ApiProperty({ required: true })
  @IsString({ message: 'Nome deve ser um texto.' })
  @MinLength(8, {
    message: 'Você deve digitar no minimo o primeiro e segundo nome.',
  })
  name: string;

  @ApiProperty({ required: true })
  @IsTaxId('pt-BR', { message: 'O número de CPF ou CNPJ é inválido.' })
  cpfCnpj: string;

  @ApiProperty({ required: true })
  @IsEmail({}, { message: 'Email inválido.' })
  email: string;

  @ApiProperty({ required: true })
  @IsMobilePhone(
    'pt-BR',
    { strictMode: true },
    { message: 'Telefone inválido.' },
  )
  mobilePhone: string;

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
