import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { MailerService } from './services/mailer.service';
import { MailgunProvider } from './providers/mailgun.provider';
import { MailerController } from './controllers/mailer.controller';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [MailerService, MailgunProvider],
  controllers: [MailerController],
  exports: [MailerService],
})
export class MailerModule {}
