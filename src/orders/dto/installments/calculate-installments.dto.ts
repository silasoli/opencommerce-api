import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsArray,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';
import { ProductItemDto } from '../create-order.dto';

export class CalculateInstallmentsDto {
  @ApiProperty({ type: [ProductItemDto], description: 'List of products' })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ProductItemDto)
  products: ProductItemDto[];
}
