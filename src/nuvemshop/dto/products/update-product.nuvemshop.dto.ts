import { PartialType } from '@nestjs/swagger';
import { CreateProductNuvemShopDto } from './create-product.nuvemshop.dto';

export class UpdateProductNuvemShopDto extends PartialType(
  CreateProductNuvemShopDto,
) {}
