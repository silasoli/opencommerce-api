import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsArray,
  ArrayMinSize,
  ValidateNested,
  IsOptional,
  IsString,
  IsInt,
  IsEnum,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';
import { BillingType } from '../../asaas/dto/payments/create-charge-asaas.dto';
import { CardAsaasDto } from '../../asaas/dto/orders/card-asaas.dto';
import { CreditCardHolderInfoAsaasDto } from '../../asaas/dto/orders/holder-info-asaas.dto';

export class ProductItemDto {
  @ApiProperty({ description: 'ID do produto' })
  @IsNotEmpty()
  product_id: number;

  @ApiProperty({ description: 'Quantidade do produto' })
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ description: 'ID da variação do produto', required: false })
  @IsNotEmpty()
  variant_id: number;
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

  @ApiProperty({ description: 'Payment method' })
  @IsNotEmpty()
  @IsEnum(BillingType)
  billingType: BillingType;

  @ValidateIf((o: CreateOrderDto) => o.billingType === BillingType.CREDIT_CARD)
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CardAsaasDto)
  @ApiProperty({
    description: 'Credit card information for the transaction',
    type: CardAsaasDto,
  })
  card: CardAsaasDto;

  @ValidateIf((o: CreateOrderDto) => o.billingType === BillingType.CREDIT_CARD)
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreditCardHolderInfoAsaasDto)
  @ApiProperty({
    description: 'Credit Card Holder Info',
    type: CreditCardHolderInfoAsaasDto,
  })
  creditCardHolderInfo: CreditCardHolderInfoAsaasDto;

  @ValidateIf((o: CreateOrderDto) => o.billingType === BillingType.CREDIT_CARD)
  @IsOptional()
  @IsInt()
  @Min(2)
  @Max(12)
  @ApiProperty({
    description: 'Number of installments (valid only for credit card payments)',
  })
  installmentCount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  shippingOptionId: number;

  @ApiProperty({ type: FullShippingAddressDto })
  @ValidateNested()
  @Type(() => FullShippingAddressDto)
  shipping_address: FullShippingAddressDto;

  @ApiProperty({ type: AddressNuvemshopDto })
  @ValidateNested()
  @Type(() => AddressNuvemshopDto)
  billing_address: AddressNuvemshopDto;
}
