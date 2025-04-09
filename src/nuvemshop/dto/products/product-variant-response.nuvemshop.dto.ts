import { ApiProperty } from '@nestjs/swagger';

export class ProductVariantResponseNuvemShopDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  product_id: number;

  @ApiProperty()
  position: number;

  @ApiProperty()
  price: string;

  @ApiProperty()
  compare_at_price: string;

  @ApiProperty({ required: false })
  promotional_price?: string;

  @ApiProperty()
  stock_management: boolean;

  @ApiProperty()
  stock: number;

  @ApiProperty()
  weight: string;

  @ApiProperty()
  width: string;

  @ApiProperty()
  height: string;

  @ApiProperty()
  depth: string;

  @ApiProperty({ required: false })
  sku?: string;

  @ApiProperty({ type: [String], required: false })
  values?: string[];

  @ApiProperty({ required: false })
  barcode?: string;

  @ApiProperty({ required: false })
  mpn?: string;

  @ApiProperty({ required: false })
  age_group?: string;

  @ApiProperty({ required: false })
  gender?: string;

  @ApiProperty()
  created_at: string;

  @ApiProperty()
  updated_at: string;

  @ApiProperty({ required: false })
  cost?: string;

  @ApiProperty()
  visible: boolean;

  @ApiProperty({
    description: 'Níveis de estoque por localização',
    required: false,
    type: () => [
      {
        id: Number,
        variant_id: Number,
        location_id: String,
        stock: Number,
      },
    ],
  })
  inventory_levels?: {
    id: number;
    variant_id: number;
    location_id: string;
    stock: number;
  }[];
}
