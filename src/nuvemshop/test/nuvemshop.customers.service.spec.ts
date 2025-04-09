import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { NuvemshopCustomersService } from '../services/nuvemshop.customers.service';
import { NuvemshopHttpService } from '../services/nuvemshop.http.service';
import { CreateCustomerNuvemShopDto } from '../dto/customers/create-customer.nuvemshop.dto';
import { UpdateCustomerNuvemShopDto } from '../dto/customers/update-customer.nuvemshop.dto';
import { CustomerResponseNuvemShopDto } from '../dto/customers/customer-response.nuvemshop.dto';
import { HttpModule } from '@nestjs/axios';

describe('NuvemshopCustomersService - Testes Reais com API', () => {
  let service: NuvemshopCustomersService;
  let createdCustomer: CustomerResponseNuvemShopDto;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), HttpModule],
      providers: [NuvemshopCustomersService, NuvemshopHttpService],
    }).compile();

    service = module.get<NuvemshopCustomersService>(NuvemshopCustomersService);
  });

  it('deve criar um customer na Nuvemshop', async () => {
    const dto: CreateCustomerNuvemShopDto = {
      name: `Cliente Teste ${Date.now()}`,
      email: `clientetest${Date.now()}@example.com`,
      phone: '+55 11 91234-5678',
      password: 'teste123',
      send_email_invite: false,
      addresses: [
        {
          address: 'Rua de Teste',
          city: 'São Paulo',
          country: 'BR',
          locality: 'Centro',
          number: '123',
          province: 'SP',
          zipcode: '01000-000',
          phone: '+55 11 91234-5678',
        },
      ],
    };

    createdCustomer = await service.create(dto);

    expect(createdCustomer).toHaveProperty('id');
    expect(createdCustomer.name).toBe(dto.name);
  });

  it('deve buscar o customer pelo ID', async () => {
    const response = await service.getById(createdCustomer.id);

    expect(response.id).toBe(createdCustomer.id);
    expect(response.email).toBe(createdCustomer.email);
  });

  it('deve atualizar o customer', async () => {
    const update: UpdateCustomerNuvemShopDto = {
      phone: '11999999999',
      billing_address: 'Rua Alterada',
      billing_city: 'São Paulo',
      billing_country: 'BR',
      billing_number: '321',
      billing_province: 'SP',
      billing_zipcode: '01234-567',
    };

    const updated = await service.update(createdCustomer.id, update);

    expect(updated.id).toBe(createdCustomer.id);
    expect(updated.billing_address).toBe(update.billing_address);
    expect(updated.phone).toBe(update.phone);
  });

  it('deve listar os customers da Nuvemshop', async () => {
    const customers = await service.getAll();

    expect(Array.isArray(customers)).toBe(true);
    expect(customers.length).toBeGreaterThan(0);
  });

  it('deve deletar o customer', async () => {
    try {
      await service.delete(createdCustomer.id);
    } catch (error) {
      // Se o cliente tiver pedido, Nuvemshop retorna 422
      expect(error).toMatch(/unprocessable entity/i);
    }
  });
});
