import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [MailerModule],
  controllers: [AppController],
})
export class AppModule {}
