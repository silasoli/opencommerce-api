import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductResponseNuvemShopDto } from '../../nuvemshop/dto/products/product-response.nuvemshop.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @ApiOperation({ summary: 'Buscar todos os produtos' })
  @ApiResponse({
    status: 200,
    description: 'Produtos retornados com sucesso',
    type: [ProductResponseNuvemShopDto],
  })
  @Get()
  findAll(): Promise<ProductResponseNuvemShopDto[]> {
    return this.service.findAll();
  }

  @ApiOperation({ summary: 'Buscar todos os produtos' })
  @ApiResponse({
    status: 200,
    description: 'Produtos retornados com sucesso',
    type: ProductResponseNuvemShopDto,
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<ProductResponseNuvemShopDto> {
    return this.service.findOne(+id);
  }
}
