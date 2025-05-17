import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  IsEmail,
  IsTaxId,
  IsPostalCode,
  IsMobilePhone,
} from 'class-validator';

export class CreditCardHolderInfoAsaasDto {
  @ApiProperty({ required: true })
  @IsString({ message: 'Nome deve ser um texto.' })
  @MinLength(8, {
    message: 'Você deve digitar no minimo o primeiro e segundo nome.',
  })
  name: string;

  @ApiProperty({ required: true })
  @IsEmail({}, { message: 'Email inválido.' })
  email: string;

  @ApiProperty({ required: true })
  @IsTaxId('pt-BR', { message: 'O número de CPF ou CNPJ é inválido.' })
  cpfCnpj: string;

  @ApiProperty({ required: true })
  @IsPostalCode('BR')
  postalCode: string;

  @ApiProperty({ required: true })
  @IsString()
  addressNumber: string;

  @ApiProperty({ required: true })
  @IsMobilePhone(
    'pt-BR',
    { strictMode: true },
    { message: 'Telefone inválido.' },
  )
  phone: string;
}
