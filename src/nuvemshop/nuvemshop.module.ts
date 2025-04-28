import { Global, Module } from '@nestjs/common';
import { NuvemshopHttpService } from './services/nuvemshop.http.service';
import { NuvemshopProductsService } from './services/nuvemshop.products.service';
import { HttpModule } from '@nestjs/axios';
import { NuvemshopOrdersService } from './services/nuvemshop.orders.service';
import { NuvemshopCustomersService } from './services/nuvemshop.customers.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [
    NuvemshopHttpService,
    NuvemshopProductsService,
    NuvemshopOrdersService,
    NuvemshopCustomersService,
  ],
  exports: [
    NuvemshopProductsService,
    NuvemshopOrdersService,
    NuvemshopCustomersService,
  ],
})
export class NuvemshopModule {}
