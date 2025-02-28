import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MailerModule } from './mailer/mailer.module';
import { ConfigModule } from '@nestjs/config';
import { ViaCepModule } from './viacep/viacep.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule,
    ViaCepModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
