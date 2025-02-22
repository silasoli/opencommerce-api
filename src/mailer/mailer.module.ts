import { Module } from '@nestjs/common';
import { MailgunService } from './providers/mailgun.service';
import { MailerService } from './services/mailer.service';

@Module({
  providers: [
    {
      provide: 'MAILER_SERVICE',
      useClass: MailgunService,
    },
    MailerService,
  ],
  exports: ['MAILER_SERVICE', MailerService],
})
export class MailerModule {}