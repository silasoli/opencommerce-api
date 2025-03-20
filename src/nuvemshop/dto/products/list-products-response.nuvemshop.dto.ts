import { ApiProperty } from '@nestjs/swagger';
import { ProductResponseNuvemShopDto } from './product-response.nuvemshop.dto';

export class ListProductsResponseNuvemShopDto {
  @ApiProperty({
    description: 'Lista de produtos',
    type: [ProductResponseNuvemShopDto],
  })
  products: ProductResponseNuvemShopDto[];

  @ApiProperty({
    description: 'Número total de produtos',
  })
  total_count: number;

  @ApiProperty({
    description: 'Número da página atual',
  })
  page: number;

  @ApiProperty({
    description: 'Número de produtos por página',
  })
  per_page: number;
}
