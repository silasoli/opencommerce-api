import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsArray,
  ArrayMinSize,
  ValidateNested,
  IsPostalCode,
} from 'class-validator';
import { ProductItemDto } from './create-order.dto';

export class EstimateShippingDto {
  @ApiProperty({ description: 'Lista de produtos', type: [ProductItemDto] })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ProductItemDto)
  products: ProductItemDto[];

  @ApiProperty({ required: true })
  @IsPostalCode('BR')
  postal_code: string;
}
