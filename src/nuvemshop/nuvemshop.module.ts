import { Global, Module } from '@nestjs/common';
import { NuvemshopHttpService } from './services/nuvemshop.http.service';
import { NuvemshopProductsService } from './services/nuvemshop.products.service';
import { HttpModule } from '@nestjs/axios';
import { NuvemshopOrdersService } from './services/nuvemshop.orders.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [
    NuvemshopHttpService,
    NuvemshopProductsService,
    NuvemshopOrdersService,
  ],
  exports: [NuvemshopProductsService, NuvemshopOrdersService],
})
export class NuvemshopModule {}
