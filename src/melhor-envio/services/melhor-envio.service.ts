import { Injectable, Logger } from '@nestjs/common';
import { MelhorEnvioHttpService } from './melhor-envio-http.service';
import { ConfigService } from '@nestjs/config';
import { ShipmentCalculateMelhorEnvioResponse } from '../types/shipment-calculate.types';
import { ShipmentCalculateMelhorEnvioDto } from '../dto/melhor-envio/shipment-calculate.dto';

@Injectable()
export class MelhorEnvioService {
  private readonly logger = new Logger(MelhorEnvioService.name);
  private readonly MELHOR_ENVIO_URL: string;
  private readonly AUTH: string;
  private readonly MELHOR_ENVIO_FROM: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly melhorEnvioHttpService: MelhorEnvioHttpService,
  ) {
    //refact:melhorar validação para usar padrao do asaas
    this.MELHOR_ENVIO_URL =
      this.configService.get<string>('MELHOR_ENVIO_URL') ?? '';
    this.AUTH = `Bearer ${this.configService.get<string>('MELHOR_ENVIO_TOKEN') ?? ''}`;
    this.MELHOR_ENVIO_FROM =
      this.configService.get<string>('MELHOR_ENVIO_FROM') ?? '';

    if (!this.MELHOR_ENVIO_URL || !this.AUTH || !this.MELHOR_ENVIO_FROM) {
      throw new Error('Configuração do Melhor Envio está incompleta.');
    }
  }

  public async calculateShipment(
    dto: ShipmentCalculateMelhorEnvioDto,
  ): Promise<ShipmentCalculateMelhorEnvioResponse[]> {
    const data = {
      from: { postal_code: this.MELHOR_ENVIO_FROM },
      to: { postal_code: dto.postal_code },
      products: dto.products,
      options: { receipt: false, own_hand: false },
      services: '1,2,3,4',
    };

    const response = await this.melhorEnvioHttpService.post<
      ShipmentCalculateMelhorEnvioResponse[],
      typeof data
    >(`${this.MELHOR_ENVIO_URL}/v2/me/shipment/calculate`, data, {
      Authorization: this.AUTH,
    });

    this.logger.log('Cotação realizada com sucesso');
    return response;
  }
}
