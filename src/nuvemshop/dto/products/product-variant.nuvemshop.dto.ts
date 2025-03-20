import { ApiProperty } from '@nestjs/swagger';

export class ProductVariantNuvemShopDto {
  @ApiProperty({ description: 'Preço da variante' })
  price: number;

  @ApiProperty({
    description: 'Preço promocional da variante',
    required: false,
  })
  promotional_price?: number;

  @ApiProperty({ description: 'SKU da variante', required: false })
  sku?: string;

  @ApiProperty({ description: 'Peso da variante em gramas', required: false })
  weight?: number;

  @ApiProperty({
    description: 'Largura da variante em centímetros',
    required: false,
  })
  width?: number;

  @ApiProperty({
    description: 'Altura da variante em centímetros',
    required: false,
  })
  height?: number;

  @ApiProperty({
    description: 'Profundidade da variante em centímetros',
    required: false,
  })
  depth?: number;

  @ApiProperty({
    description: 'Valores dos atributos que definem a variante (ex: Azul, M)',
    type: [String],
    required: false,
  })
  values?: string[];

  @ApiProperty({
    description: 'Quantidade em estoque da variante',
    required: false,
  })
  stock?: number;
}
