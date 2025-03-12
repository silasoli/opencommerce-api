import { ApiProperty } from '@nestjs/swagger';
import { FindOneResponse } from '../types/find-one-response.types';

export class FindByPostalCodeResponseDto {
  constructor(entity: FindOneResponse) {
    Object.assign(this, entity);
  }

  @ApiProperty()
  cep: string;

  @ApiProperty()
  logradouro: string;

  @ApiProperty()
  complemento?: string;

  @ApiProperty()
  unidade?: string;

  @ApiProperty()
  bairro: string;

  @ApiProperty()
  localidade: string;

  @ApiProperty()
  uf: string;

  @ApiProperty()
  estado: string;

  @ApiProperty()
  regiao: string;

  @ApiProperty()
  ibge: string;

  @ApiProperty()
  gia?: string;

  @ApiProperty()
  ddd: string;

  @ApiProperty()
  siafi: string;
}
