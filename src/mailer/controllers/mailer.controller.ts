import { Controller, Post } from '@nestjs/common';
import { MailerService } from '../services/mailer.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Mailer')
@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('send')
  async sendEmail() {
    await this.mailerService.sendEmailWithTemplate({
      to: 'hugovco511@gmail.com',
      subject: 'Email teste',
      template: 'welcome',
      variables: { name: 'Victor teste' },
    });
    return this.mailerService.sendEmailWithText({
      subject: 'Email teste',
      to: 'silasoliv39@gmail.com',
      text: 'Email teste',
    });
  }
}
