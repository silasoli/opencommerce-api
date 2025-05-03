import { Module } from '@nestjs/common';
import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';
import { MelhorEnvioModule } from '../melhor-envio/melhor-envio.module';
import { PublicOrdersController } from './controllers/public-orders.controller';

@Module({
  imports: [MelhorEnvioModule],
  controllers: [OrdersController, PublicOrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
