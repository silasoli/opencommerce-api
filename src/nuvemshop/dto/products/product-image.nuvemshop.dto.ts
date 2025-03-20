import { ApiProperty } from '@nestjs/swagger';

export class ProductImageNuvemShopDto {
  @ApiProperty({ description: 'URL da imagem do produto' })
  src: string;

  @ApiProperty({ description: 'Texto alternativo da imagem', required: false })
  alt?: string;

  @ApiProperty({
    description: 'Posição da imagem na lista de imagens',
    required: false,
  })
  position?: number;
}
