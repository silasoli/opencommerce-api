import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import { NuvemshopHttpService } from '../services/nuvemshop.http.service';
import { NuvemshopOrdersService } from '../services/nuvemshop.orders.service';
import { NuvemshopProductsService } from '../services/nuvemshop.products.service';

import { CreateProductNuvemShopDto } from '../dto/products/create-product.nuvemshop.dto';
import { ProductResponseNuvemShopDto } from '../dto/products/product-response.nuvemshop.dto';

import { CreateOrderNuvemShopDto } from '../dto/orders/create-order.nuvemshop.dto';
import { OrderResponseNuvemShopDto } from '../dto/orders/order-response.nuvemshop.dto';

describe('NuvemshopOrdersService - Testes Reais com API', () => {
  let ordersService: NuvemshopOrdersService;
  let productsService: NuvemshopProductsService;
  let createdProduct: ProductResponseNuvemShopDto;
  let createdOrder: OrderResponseNuvemShopDto;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), HttpModule],
      providers: [
        NuvemshopHttpService,
        NuvemshopOrdersService,
        NuvemshopProductsService,
      ],
    }).compile();

    ordersService = module.get(NuvemshopOrdersService);
    productsService = module.get(NuvemshopProductsService);

    // Criação de um produto para usar no pedido
    const productDto: CreateProductNuvemShopDto = {
      name: `Produto Order Teste ${Date.now()}`,
      description: 'Produto criado para teste de pedidos',
      variants: [
        {
          price: 99.9,
          stock: 10,
        },
      ],
    };

    createdProduct = await productsService.create(productDto);
  });

  afterAll(async () => {
    await productsService.delete(createdProduct.id);
  });

  it('deve criar um pedido na Nuvemshop', async () => {
    const dto: CreateOrderNuvemShopDto = {
      contact_email: `cliente${Date.now()}@example.com`,
      contact_phone: '11999999999',
      products: [
        {
          product_id: createdProduct.id,
          quantity: 1,
          variant_id: createdProduct.variants[0].id,
        },
      ],
      shipping_address: {
        address: 'Rua Teste',
        city: 'São Paulo',
        country: 'BR',
        number: '123',
        province: 'SP',
        zipcode: '01234-567',
        phone: '11999999999',
      },
    };

    createdOrder = await ordersService.create(dto);

    expect(createdOrder).toHaveProperty('id');
    expect(createdOrder.products[0].product_id).toBe(createdProduct.id);
  });

  it('deve buscar o pedido criado por ID', async () => {
    const response = await ordersService.getById(createdOrder.id);

    expect(response.id).toBe(createdOrder.id);
    expect(response.contact_email).toBe(createdOrder.contact_email);
  });

  it('deve listar pedidos da Nuvemshop', async () => {
    const response = await ordersService.getAll();

    expect(Array.isArray(response)).toBe(true);
    expect(response.length).toBeGreaterThan(0);
  });
});
