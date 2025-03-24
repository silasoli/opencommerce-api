import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { CreateProductNuvemShopDto } from '../dto/products/create-product.nuvemshop.dto';
// import { ListProductsResponseNuvemShopDto } from '../dto/products/list-products-response.nuvemshop.dto';
import { ProductResponseNuvemShopDto } from '../dto/products/product-response.nuvemshop.dto';
// import { UpdateProductNuvemShopDto } from '../dto/products/update-product.nuvemshop.dto';
import { NuvemshopHttpService } from '../services/nuvemshop.http.service';
import { NuvemshopProductsService } from '../services/nuvemshop.products.service';
import { HttpModule } from '@nestjs/axios';

describe('NuvemshopProductsService - Testes Reais com API', () => {
  let service: NuvemshopProductsService;
  let createdProduct: ProductResponseNuvemShopDto;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), HttpModule],
      providers: [NuvemshopProductsService, NuvemshopHttpService],
    }).compile();

    service = module.get<NuvemshopProductsService>(NuvemshopProductsService);
  });

  it('deve criar um produto na Nuvemshop', async () => {
    const productDto: CreateProductNuvemShopDto = {
      name: `Produto Teste ${Date.now()}`,
      description: 'Descrição do produto de teste',
      variants: [
        {
          price: 99.9,
          stock: 10,
        },
      ],
    };

    createdProduct = await service.create(productDto);

    expect(createdProduct).toHaveProperty('id');
    expect(createdProduct.name).toMatchObject({ pt: productDto.name });

    expect(createdProduct.variants[0].price).toBe('99.90');
    expect(createdProduct.variants[0].stock).toBe(10);
  });

  it('deve listar produtos da Nuvemshop', async () => {
    const response: ProductResponseNuvemShopDto[] = await service.getAll();

    expect(Array.isArray(response)).toBe(true);
    expect(response.length).toBeGreaterThan(0);
  });

  it('deve buscar um produto pelo ID', async () => {
    const response: ProductResponseNuvemShopDto = await service.getById(
      createdProduct.id,
    );

    expect(response).toHaveProperty('id', createdProduct.id);
    expect(response.name).toMatchObject(createdProduct.name);
  });

  // it('deve atualizar um produto na Nuvemshop', async () => {
  //   const updateDto: UpdateProductNuvemShopDto = {
  //     variants: [
  //       {
  //         price: 79.9,
  //         stock: 5,
  //       },
  //     ],
  //   };

  //   const updatedProduct: ProductResponseNuvemShopDto = await service.update(
  //     createdProduct.id,
  //     updateDto,
  //   );

  //   console.log('Produto atualizado:', updatedProduct);

  //   expect(updatedProduct).toHaveProperty('id', createdProduct.id);

  //   expect(updatedProduct.variants[0].price).toBe(79.9);
  //   expect(updatedProduct.variants[0].stock).toBe(5);
  // });

  // it('deve desativar um produto na Nuvemshop', async () => {
  //   const response = await service.delete(createdProduct.id);

  //   expect(response).toBeUndefined();
  // });
});
