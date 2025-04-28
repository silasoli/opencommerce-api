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

// class CustomerDto {
//   @ApiProperty({ description: 'ID do cliente na Nuvemshop', required: false })
//   @IsOptional()
//   id?: number;
// }

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

class ShippingAddressDto {
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
  //   @ApiProperty({
  //     description: 'Cliente associado ao pedido',
  //     type: CustomerDto,
  //     required: false,
  //   })
  //   @IsOptional()
  //   @ValidateNested()
  //   @Type(() => CustomerDto)
  //   customer?: CustomerDto;

  @ApiProperty({ description: 'Lista de produtos', type: [ProductItemDto] })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ProductItemDto)
  products: ProductItemDto[];

  @ApiProperty({
    description: 'Opção de envio selecionada',
    type: ShippingOptionDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ShippingOptionDto)
  shipping_option: ShippingOptionDto;

  @ApiProperty({
    description: 'Endereço de envio',
    type: ShippingAddressDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ShippingAddressDto)
  shipping_address: ShippingAddressDto;
}
