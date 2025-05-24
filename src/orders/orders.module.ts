import { Module } from '@nestjs/common';
import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';
import { MelhorEnvioModule } from '../melhor-envio/melhor-envio.module';
import { PublicOrdersController } from './controllers/public-orders.controller';
import { InstallmentsService } from './services/installments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from '../database/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Orders]), MelhorEnvioModule],
  controllers: [OrdersController, PublicOrdersController],
  providers: [OrdersService, InstallmentsService],
})
export class OrdersModule {}
