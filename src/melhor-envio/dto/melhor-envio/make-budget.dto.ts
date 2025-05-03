import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsPostalCode,
  ValidateNested,
} from 'class-validator';
import { ProductsVariantsToShipping } from '../../../orders/types/orders.type';
// import { ProductDto } from '../../../orders/dto/order/product.dto';

export class MakeBudgetMelhorEnvioDto {
  @ApiProperty({ required: true })
  @IsPostalCode('BR')
  postal_code: string;

  // @ApiProperty({ type: [ProductDto], description: 'List of products' })
  @ApiProperty({ description: 'List of products' })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  // @Type(() => ProductDto)
  products: ProductsVariantsToShipping[];
}
