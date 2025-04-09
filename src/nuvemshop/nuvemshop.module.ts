import { Module } from '@nestjs/common';
import { NuvemshopHttpService } from './services/nuvemshop.http.service';
import { NuvemshopProductsService } from './services/nuvemshop.products.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [NuvemshopHttpService, NuvemshopProductsService],
})
export class NuvemshopModule {}
