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
import { ApiProperty } from '@nestjs/swagger';

class AddressDto {
  @ApiProperty() address: string;
  @ApiProperty() city: string;
  @ApiProperty() country: string;
  @ApiProperty() floor: string;
  @ApiProperty() id: number;
  @ApiProperty() locality: string;
  @ApiProperty() name: string;
  @ApiProperty() number: string;
  @ApiProperty() phone: string;
  @ApiProperty() province: string;
  @ApiProperty() zipcode: string;
}

class ProductDto {
  @ApiProperty() id: number;
  @ApiProperty() name: string;
  @ApiProperty() price: string;
  @ApiProperty() quantity: number;
  @ApiProperty() sku: string;
  @ApiProperty() weight: string;
  @ApiProperty() product_id: number;
}

class CustomerDto {
  @ApiProperty() id: number;
  @ApiProperty() name: string;
  @ApiProperty() email: string;
  @ApiProperty() total_spent: string;
  @ApiProperty() total_spent_currency: string;
}

export class OrderResponseNuvemShopDto {
  @ApiProperty() id: number;
  @ApiProperty() token: string;
  @ApiProperty() store_id: number;
  @ApiProperty() subtotal: string;
  @ApiProperty() discount: string;
  @ApiProperty() total: string;
  @ApiProperty() total_usd: string;
  @ApiProperty() currency: string;
  @ApiProperty() language: string;
  @ApiProperty() weight: string;
  @ApiProperty() gateway_name: string;
  @ApiProperty() shipping: string;
  @ApiProperty() shipping_option: string;
  @ApiProperty() created_at: string;
  @ApiProperty() updated_at: string;
  @ApiProperty() payment_status: string;
  @ApiProperty({ type: CustomerDto }) customer: CustomerDto;
  @ApiProperty({ type: [ProductDto] }) products: ProductDto[];
  @ApiProperty({ type: AddressDto }) shipping_address: AddressDto;
}