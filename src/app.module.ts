import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MailerModule } from './mailer/mailer.module';
import { ConfigModule } from '@nestjs/config';
import { ViaCepModule } from './viacep/viacep.module';
import { AsaasModule } from './asaas/asaas.module';
import { MelhorEnvioModule } from './melhor-envio/melhor-envio.module';
import { NuvemshopModule } from './nuvemshop/nuvemshop.module';

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
  ],
  controllers: [AppController],
})
export class AppModule {}
