import { Controller, Post, Body } from '@nestjs/common';
import { MailerService } from '../services/mailer.service';
import { SendEmailDto } from '../dto/send-email.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Mailer')
@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('send')
  async sendEmail(@Body() dto: SendEmailDto) {
    return this.mailerService.sendEmail(dto);
  }
}
