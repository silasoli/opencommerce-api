import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';

import { MelhorEnvioService } from '../services/melhor-envio.service';
import { MelhorEnvioHttpService } from '../services/melhor-envio-http.service';
import { MakeBudgetMelhorEnvioDto } from '../dto/melhor-envio/make-budget.dto';
import { HttpModule } from '@nestjs/axios';

describe('MelhorEnvioService - Integração Real com API', () => {
  let melhorEnvioService: MelhorEnvioService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), HttpModule],
      providers: [MelhorEnvioService, MelhorEnvioHttpService],
    }).compile();

    melhorEnvioService = module.get(MelhorEnvioService);
  });

  it('deve retornar cotações de frete com base nos dados enviados', async () => {
    const dto: MakeBudgetMelhorEnvioDto = {
      postal_code: '01001-000',
      products: [
        {
          variant: {
            id: 1,
            width: `11`,
            height: `17`,
            weight: `0.3`,
            product_id: 0,
            position: 2,
            price: '',
            compare_at_price: '',
            stock_management: false,
            stock: 0,
            depth: '',
            created_at: '',
            updated_at: '',
            visible: false,
          },
          quantity: 1,
        },
      ],
    };

    const response = await melhorEnvioService.seekDeliveryQuote(dto);

    expect(Array.isArray(response)).toBe(true);
    expect(response.length).toBeGreaterThan(0);
    expect(response[0]).toHaveProperty('name');
    expect(response[0]).toHaveProperty('price');
    expect(response[0]).toHaveProperty('delivery_time');
  });
});
