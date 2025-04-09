import { ApiProperty } from '@nestjs/swagger';
import { ProductImageNuvemShopDto } from './product-image.nuvemshop.dto';
import { ProductVariantResponseNuvemShopDto } from './product-variant-response.nuvemshop.dto';

export class ProductResponseNuvemShopDto {
  @ApiProperty({ description: 'Identificador único do produto' })
  id: number;

  @ApiProperty({
    description: 'Lista de nomes do produto em cada idioma suportado pela loja',
    type: [String],
  })
  name: string[];

  @ApiProperty({
    description:
      'Lista de descrições do produto em HTML para cada idioma suportado pela loja',
    type: [String],
  })
  description: string[];

  @ApiProperty({
    description:
      'Lista de URLs amigáveis geradas a partir dos nomes do produto em cada idioma',
    type: [String],
  })
  handle: string[];

  @ApiProperty({
    description: 'Lista de variantes do produto',
    type: [ProductVariantResponseNuvemShopDto],
  })
  variants: ProductVariantResponseNuvemShopDto[];

  @ApiProperty({
    description: 'Lista de imagens do produto',
    type: [ProductImageNuvemShopDto],
  })
  images: ProductImageNuvemShopDto[];

  @ApiProperty({
    description: 'Lista de IDs das categorias às quais o produto pertence',
    type: [Number],
  })
  categories: number[];

  @ApiProperty({ description: 'Marca do produto', required: false })
  brand?: string;

  @ApiProperty({
    description: 'Indica se o produto está publicado na loja',
    default: true,
  })
  published: boolean;

  @ApiProperty({
    description: 'Indica se o produto é elegível para frete grátis',
    default: false,
  })
  free_shipping: boolean;

  @ApiProperty({
    description: 'URL de um vídeo relacionado ao produto',
    required: false,
  })
  video_url?: string;

  @ApiProperty({
    description: 'Título SEO do produto (até 70 caracteres)',
    required: false,
  })
  seo_title?: string;

  @ApiProperty({
    description: 'Descrição SEO do produto (até 320 caracteres)',
    required: false,
  })
  seo_description?: string;

  @ApiProperty({
    description:
      'Lista de nomes dos atributos que definem as variantes (ex: Cor, Tamanho)',
    type: [String],
  })
  attributes: string[];

  @ApiProperty({
    description: 'Tags do produto, separadas por vírgulas',
    required: false,
  })
  tags?: string;

  @ApiProperty({
    description: 'Data de criação do produto no formato ISO 8601',
  })
  created_at: string;

  @ApiProperty({
    description: 'Data da última atualização do produto no formato ISO 8601',
  })
  updated_at: string;

  @ApiProperty({
    description:
      'Indica se o produto requer envio (true para produtos físicos, false para digitais)',
    default: true,
  })
  requires_shipping: boolean;
}
