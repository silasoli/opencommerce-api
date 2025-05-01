import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsArray,
  ArrayMinSize,
  ValidateNested,
  IsOptional,
  IsString,
} from 'class-validator';

class ProductItemDto {
  @ApiProperty({ description: 'ID do produto' })
  @IsNotEmpty()
  product_id: number;

  @ApiProperty({ description: 'Quantidade do produto' })
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ description: 'ID da variação do produto', required: false })
  @IsOptional()
  variant_id?: number;
}

class ShippingOptionDto {
  @ApiProperty({ description: 'Nome do método de envio', required: false })
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Custo do envio', required: false })
  @IsOptional()
  cost?: string;

  @ApiProperty({ description: 'Estimativa de entrega', required: false })
  @IsOptional()
  delivery_estimate?: string;
}

class AddressNuvemshopDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  number: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  floor?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  locality?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  province: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  zipcode: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phone?: string;
}

class FullShippingAddressDto {
  @ApiProperty({ description: 'Primeiro nome do destinatário' })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({ description: 'Sobrenome do destinatário' })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({ description: 'Endereço' })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ description: 'Número' })
  @IsNotEmpty()
  @IsString()
  number: string;

  @ApiProperty({ description: 'Cidade' })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({ description: 'Estado/Província' })
  @IsNotEmpty()
  @IsString()
  province: string;

  @ApiProperty({ description: 'País' })
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty({ description: 'CEP' })
  @IsNotEmpty()
  @IsString()
  zipcode: string;

  @ApiProperty({ description: 'Telefone', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ description: 'Andar', required: false })
  @IsOptional()
  @IsString()
  floor?: string;

  @ApiProperty({ description: 'Localidade', required: false })
  @IsOptional()
  @IsString()
  locality?: string;
}

export class CreateOrderDto {
  @ApiProperty({ description: 'Lista de produtos', type: [ProductItemDto] })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ProductItemDto)
  products: ProductItemDto[];

  @ApiProperty({ type: ShippingOptionDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => ShippingOptionDto)
  shipping_option: ShippingOptionDto;

  @ApiProperty({ type: FullShippingAddressDto })
  @ValidateNested()
  @Type(() => FullShippingAddressDto)
  shipping_address: FullShippingAddressDto;

  @ApiProperty({ type: AddressNuvemshopDto })
  @ValidateNested()
  @Type(() => AddressNuvemshopDto)
  billing_address: AddressNuvemshopDto;
}