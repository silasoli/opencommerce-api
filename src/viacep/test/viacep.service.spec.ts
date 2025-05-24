import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import { ViaCepService } from '../services/viacep.service';
import { ViaCepHttpService } from '../services/viacephttp.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('ViaCepService - Integração Real com API', () => {
  let viaCepService: ViaCepService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), HttpModule],
      providers: [ViaCepService, ViaCepHttpService],
    }).compile();

    viaCepService = module.get(ViaCepService);
  });

  it('deve retornar os dados de endereço com base no CEP informado', async () => {
    const postalCode = '01001-000';

    const response = await viaCepService.findByPostalCode(postalCode);

    expect(response).toBeDefined();
    expect(response).toHaveProperty('cep', '01001-000');
    expect(response).toHaveProperty('logradouro', 'Praça da Sé');
    expect(response).toHaveProperty('bairro', 'Sé');
    expect(response).toHaveProperty('localidade', 'São Paulo');
    expect(response).toHaveProperty('estado', 'São Paulo');
    expect(response).toHaveProperty('regiao', 'Sudeste');
  });

  it('deve retornar um BAD REQUEST quando falhar ao buscar um CEP Inválido', async () => {
    const postalCode = '00000-00';

    await expect(viaCepService.findByPostalCode(postalCode)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('deve retornar um NOT FOUND quando falhar ao buscar um CEP Inexistente', async () => {
    const postalCode = '00000-000';

    await expect(viaCepService.findByPostalCode(postalCode)).rejects.toThrow(
      NotFoundException,
    );
  });
});
