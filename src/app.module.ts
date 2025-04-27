import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MailerModule } from './mailer/mailer.module';
import { ConfigModule } from '@nestjs/config';
import { ViaCepModule } from './viacep/viacep.module';
import { AsaasModule } from './asaas/asaas.module';
import { MelhorEnvioModule } from './melhor-envio/melhor-envio.module';
import { NuvemshopModule } from './nuvemshop/nuvemshop.module';
import { UsersModule } from './users/users.module';
import { TypeOrmConfigModule } from './database/typeorm.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule,
    ViaCepModule,
    AsaasModule,
    MelhorEnvioModule,
    NuvemshopModule,
    UsersModule,
    TypeOrmConfigModule,
    RolesModule,
    AuthModule,
    ProductsModule,
    OrdersModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
