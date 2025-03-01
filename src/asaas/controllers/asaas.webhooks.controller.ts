import { Controller, Post, Body, Headers } from '@nestjs/common';
// import { ApiTags } from '@nestjs/swagger';
import { AsaasWebhooksService } from '../services/asaas.webhooks.service';
import { PaymentWebook } from '../types/webhooks/webhook.types';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
// @ApiTags('webhooks')
@Controller('webhooks')
export class AsaasWebhooksController {
  constructor(private readonly asaasWebhooksService: AsaasWebhooksService) {}

  @Post('payment-confirmed')
  create(
    @Headers('asaas-access-token') authorizationToken: string,
    @Body() dto: PaymentWebook,
  ): Promise<void> {
    return this.asaasWebhooksService.validateAndExecutePaymentConfirmed(
      authorizationToken,
      dto,
    );
  }
}
