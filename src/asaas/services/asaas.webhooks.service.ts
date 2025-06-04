import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { PaymentWebook } from '../types/webhooks/webhook.types';
import { OrdersService } from '../../orders/services/orders.service';
import { UsersService } from '../../users/services/users.service';
import { ASAAS_ERRORS } from '../constants/asaas.errors';
import { PaymentStatus } from '../../database/entities/order.entity';
// import { PaymentStatus } from '../../database/entities/order.entity';

@Injectable()
export class AsaasWebhooksService {
  private readonly logger = new Logger(AsaasWebhooksService.name);

  constructor(
    private readonly ordersService: OrdersService,
    private readonly usersService: UsersService,
  ) { }

  private async paymentConfirmed(data: PaymentWebook): Promise<void> {
    this.logger.log('INICIANDO WEBHOOK - EVENTO: PAYMENT_CONFIRMED');
    this.logger.log(`DATA:`, data);

    await this.handlerPaymentConfirmed(data);

    this.logger.log('FINALIZANDO WEBHOOK - EVENTO: PAYMENT_CONFIRMED');
  }

  private async handlerPaymentConfirmed(data: PaymentWebook): Promise<void> {
    if (data.event != 'PAYMENT_CONFIRMED')
      throw new BadRequestException('EVENTO INVALIDO');

    const order = await this.ordersService.findOneByAsaasOrderId(
      data.payment.id,
    );

    const user = await this.usersService.findOne(order.user_id);

    if (user.asaas_customer_id != data.payment.customer) throw ASAAS_ERRORS.WEBHOOK_ERROR;

    await this.ordersService.updateOrderStatus(
      order.id,
      order.nuvemshop_order_id,
      PaymentStatus.CONFIRMED,
    );
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
