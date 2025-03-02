import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AsaasCustomersService } from './services/asaas.customers.service';
import { AsaasPaymentsService } from './services/asaas.payments.service';
import { AsaasWebhooksService } from './services/asaas.webhooks.service';
import { AsaasWebhooksController } from './controllers/asaas.webhooks.controller';
import { AsaasHttpService } from './services/asaas.http.service';

@Global()
@Module({
  controllers: [AsaasWebhooksController],
  imports: [HttpModule],
  providers: [
    AsaasCustomersService,
    AsaasPaymentsService,
    AsaasWebhooksService,
    AsaasHttpService,
  ],
  exports: [AsaasCustomersService, AsaasPaymentsService],
})
export class AsaasModule {}
