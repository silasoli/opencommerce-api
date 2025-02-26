import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MailerModule } from './mailer/mailer.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
