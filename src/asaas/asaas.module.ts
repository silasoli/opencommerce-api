import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AsaasCustomersService } from './services/asaas.customers.service';
import { AsaasPaymentsService } from './services/asaas.payments.service';
import { AsaasWebhooksService } from './services/asaas.webhooks.service';
import { AsaasWebhooksController } from './controllers/asaas.webhooks.controller';

@Global()
@Module({
  controllers: [AsaasWebhooksController],
  imports: [HttpModule],
  providers: [
    AsaasCustomersService,
    AsaasPaymentsService,
    AsaasWebhooksService,
  ],
  exports: [AsaasCustomersService, AsaasPaymentsService],
})
export class AsaasModule {}
