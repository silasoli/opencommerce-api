import { Injectable } from '@nestjs/common';
import { NuvemshopProductsService } from '../../nuvemshop/services/nuvemshop.products.service';
import { ProductResponseNuvemShopDto } from '../../nuvemshop/dto/products/product-response.nuvemshop.dto';

@Injectable()
export class ProductsService {
  constructor(
    private readonly nuvemshopProductsService: NuvemshopProductsService,
  ) {}

  public async findAll(): Promise<ProductResponseNuvemShopDto[]> {
    return this.nuvemshopProductsService.getAll();
  }

  public async findOne(id: number): Promise<ProductResponseNuvemShopDto> {
    return this.nuvemshopProductsService.getById(id);
  }
}
