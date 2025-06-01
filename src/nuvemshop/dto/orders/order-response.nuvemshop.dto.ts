// export class OrderResponseNuvemShopDto {
//   id: number;
//   number: number;
//   contact_email: string;
//   contact_phone?: string;
//   total: string;
//   currency: string;
//   payment_status: string;
//   shipping_status: string;
//   created_at: string;
//   updated_at: string;
//   products: {
//     id: number;
//     product_id: number;
//     name: string;
//     quantity: number;
//     price: string;
//     variant_id?: number;
//   }[];
//   customer?: {
//     id: number;
//     name: string;
//     email: string;
//     phone?: string;
//   };
// }
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class ProductDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  product_id: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  price: string;

  @ApiPropertyOptional()
  variant_id?: number;

  @ApiPropertyOptional()
  sku?: string;

  @ApiPropertyOptional()
  cost?: string;
}

class AddressDto {
  @ApiProperty()
  address: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  floor: string;

  @ApiProperty()
  locality: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  number: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  province: string;

  @ApiProperty()
  zipcode: string;
}

class ShippingAddressDto extends AddressDto {}

class CustomerDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiPropertyOptional()
  phone?: string;

  @ApiPropertyOptional({ type: () => AddressDto })
  default_address?: AddressDto;
}

export class OrderResponseNuvemShopDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  number: number;

  @ApiProperty()
  contact_email: string;

  @ApiProperty()
  contact_name: string;

  @ApiPropertyOptional()
  contact_phone?: string;

  @ApiProperty()
  total: string;

  @ApiProperty()
  currency: string;

  @ApiProperty()
  payment_status: string;

  @ApiProperty()
  shipping_status: string;

  @ApiProperty()
  created_at: string;

  @ApiProperty()
  updated_at: string;

  @ApiProperty({ type: () => [ProductDto] })
  products: ProductDto[];

  @ApiPropertyOptional({ type: () => CustomerDto })
  customer?: CustomerDto;

  @ApiPropertyOptional({ type: () => ShippingAddressDto })
  shipping_address?: ShippingAddressDto;
}