import { Module } from '@nestjs/common';
import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';
import { MelhorEnvioModule } from '../melhor-envio/melhor-envio.module';

@Module({
  imports: [MelhorEnvioModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
