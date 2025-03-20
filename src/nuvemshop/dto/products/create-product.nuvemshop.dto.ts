import { ApiProperty } from '@nestjs/swagger';
import { ProductImageNuvemShopDto } from './product-image.nuvemshop.dto';
import { ProductVariantNuvemShopDto } from './product-variant.nuvemshop.dto';

export class CreateProductNuvemShopDto {
  @ApiProperty({ description: 'Nome do produto' })
  name: string;

  @ApiProperty({ description: 'Descrição do produto em HTML', required: false })
  description?: string;

  @ApiProperty({ description: 'Marca do produto', required: false })
  brand?: string;

  @ApiProperty({ description: 'Produto publicado na loja', default: true })
  published?: boolean;

  @ApiProperty({
    description: 'Produto elegível para frete grátis',
    default: false,
  })
  free_shipping?: boolean;

  @ApiProperty({ description: 'URL do vídeo do produto', required: false })
  video_url?: string;

  @ApiProperty({ description: 'Título SEO do produto', required: false })
  seo_title?: string;

  @ApiProperty({ description: 'Descrição SEO do produto', required: false })
  seo_description?: string;

  @ApiProperty({
    description: 'Atributos que definem as variantes (ex: Cor, Tamanho)',
    type: [String],
    required: false,
  })
  attributes?: string[];

  @ApiProperty({
    description: 'Tags do produto, separadas por vírgulas',
    required: false,
  })
  tags?: string;

  @ApiProperty({
    description: 'IDs das categorias às quais o produto pertence',
    type: [Number],
    required: false,
  })
  categories?: number[];

  @ApiProperty({
    description: 'Variantes do produto',
    type: [ProductVariantNuvemShopDto],
    required: false,
  })
  variants?: ProductVariantNuvemShopDto[];

  @ApiProperty({
    description: 'Imagens do produto',
    type: [ProductImageNuvemShopDto],
    required: false,
  })
  images?: ProductImageNuvemShopDto[];
}
