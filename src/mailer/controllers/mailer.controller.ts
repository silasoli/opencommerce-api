import { Controller, Post, Body, Inject } from '@nestjs/common';
import { MailerService } from '../services/mailer.service';
import { MailgunService } from '../providers/mailgun.service';
import { SendGridService } from '../providers/sendgrid.service';
import { EmailResponseDto } from '../dto/email-response.dto';
import { SendEmailDto } from '../dto/send-email.dto';

@Controller('mailer')
export class MailerController {
  constructor(
    private readonly mailerService: MailerService,
    @Inject(MailgunService) private readonly mailgunService: MailgunService,
    @Inject(SendGridService) private readonly sendGridService: SendGridService,
  ) {}

  @Post('send-mailgun')
  async sendWithMailgun(@Body() body: SendEmailDto): Promise<EmailResponseDto> {
    await this.mailgunService.sendEmail(
      body.to,
      body.subject,
      body.variables,
      body.attachments,
    );
    return new EmailResponseDto('E-mail enviado com sucesso via Mailgun');
  }

  @Post('send-sendgrid')
  async sendWithSendGrid(
    @Body() body: SendEmailDto,
  ): Promise<EmailResponseDto> {
    await this.sendGridService.sendEmail(
      body.to,
      body.subject,
      body.variables,
      body.attachments,
    );
    return new EmailResponseDto('E-mail enviado com sucesso via SendGrid');
  }
}
