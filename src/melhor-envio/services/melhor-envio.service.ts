import { Injectable, Logger } from '@nestjs/common';
import { MelhorEnvioHttpService } from './melhor-envio-http.service';
import { ConfigService } from '@nestjs/config';
import { ShipmentCalculateMelhorEnvioResponse } from '../types/shipment-calculate.types';
import { ShipmentCalculateMelhorEnvioDto } from '../dto/melhor-envio/shipment-calculate.dto';
import { MakeBudgetMelhorEnvioDto } from '../dto/melhor-envio/make-budget.dto';
import { ProductsToSendType } from '../types/shipping.types';
import { ShipmentCalculateMelhorEnvioResponseDto } from '../dto/shipment-calculate-response.dto';
import { ProductsVariantsToShipping } from '../../orders/types/orders.type';

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

  private removeShipmentErrors(
    shipment: ShipmentCalculateMelhorEnvioResponse[],
  ) {
    return shipment.filter((item) => !item.error);
  }

  private formatProductsToShipping(
    shippingProducs: ProductsVariantsToShipping[],
  ): ProductsToSendType[] {
    return shippingProducs.map((shippingItem) => {
      return {
        id: String(shippingItem.variant.id),
        quantity: shippingItem.quantity,
        width: Number(shippingItem.variant.width),
        height: Number(shippingItem.variant.height),
        length: Number(shippingItem.variant.depth),
        weight: Number(shippingItem.variant.weight),
        // as dimensões devem ser enviadas em centímetros (cm)
        // width: 32,
        // height: 32,
        // length: 32,
        //peso em quilogramas (kg)
        // weight: 0.2,
        insurance_value: Number(shippingItem.variant.price),
      };
    });
  }

  public async seekDeliveryQuote(
    dto: MakeBudgetMelhorEnvioDto,
  ): Promise<ShipmentCalculateMelhorEnvioResponseDto[]> {
    const formattedProducts = this.formatProductsToShipping(dto.products);

    const deliverysQuote = await this.calculateShipment({
      postal_code: dto.postal_code,
      products: formattedProducts,
    });

    return deliverysQuote.map(
      (item) => new ShipmentCalculateMelhorEnvioResponseDto(item),
    );
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

    this.logger.log('Iniciando cotação');

    const response = await this.melhorEnvioHttpService.post<
      ShipmentCalculateMelhorEnvioResponse[],
      typeof data
    >(`${this.MELHOR_ENVIO_URL}/v2/me/shipment/calculate`, data, {
      Authorization: this.AUTH,
    });

    this.logger.log('Cotação realizada com sucesso');

    return this.removeShipmentErrors(response);
  }
}
