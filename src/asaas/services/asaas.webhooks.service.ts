import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { PaymentWebook } from '../types/webhooks/webhook.types';
// import { OrdersService } from '../../orders/services/orders.service';
// import { PaymentStatus } from '../../database/entities/order.entity';

@Injectable()
export class AsaasWebhooksService {
  private readonly logger = new Logger(AsaasWebhooksService.name);

  // constructor(private readonly ordersService: OrdersService) { }

  private async paymentConfirmed(data: PaymentWebook): Promise<void> {
    this.logger.log('INICIANDO WEBHOOK - EVENTO: PAYMENT_CONFIRMED');
    this.logger.log(`DATA:`, data);

    await this.handlerPaymentConfirmed(data);

    this.logger.log('FINALIZANDO WEBHOOK - EVENTO: PAYMENT_CONFIRMED');
  }

  private async handlerPaymentConfirmed(data: PaymentWebook): Promise<void> {
    if (data.event != 'PAYMENT_CONFIRMED')
      throw new BadRequestException('EVENTO INVALIDO');

    // const order = await this.ordersService.findOneByExternalID(data.payment.id);
    // if (order.external_customer_id != data.payment.customer)
    //   throw new BadRequestException();

    //validar se o pagamento foi no boleto ou pix e atualizar a quantidade do pedido

    // await this.ordersService.updateOrderStatus(
    //   order.id,
    //   PaymentStatus.CONFIRMED,
    // );
    return Promise.resolve();
  }

  public async validateAndExecutePaymentConfirmed(
    authorizationToken: string,
    body: PaymentWebook,
  ): Promise<void> {
    this.validAuthorization(authorizationToken);

    return this.paymentConfirmed(body);
  }

  private validAuthorization(authorizationToken: string): void {
    if (process.env.ASAAS_WEBHOOK_TOKEN !== authorizationToken)
      throw new UnauthorizedException('INVALID CREDENTIALS');
  }
}
