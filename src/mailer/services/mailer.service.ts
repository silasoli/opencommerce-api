import { SendEmailDto } from '../dto/send-email.dto';
import { IMailerProvider } from '../interfaces/IMailer.interface';
import * as fs from 'fs';
import * as path from 'path';
import ejs from 'ejs';

export class MailerService {
  sendEmail(to: string, subject: string, attachments: { filename: string; path: string; }[] | undefined) {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly mailerProvider: IMailerProvider) {}

  public async sendEmailWithTemplate(
    dto: SendEmailDto,
    template: string,
  ): Promise<void> {
    const filename = path.join(
      process.cwd(),
      'src/mailer/templates',
      `${template}.ejs`,
    );

    if (!fs.existsSync(filename)) {
      throw new Error(`Template ${template} não encontrado.`);  
    }

    const templateString = fs.readFileSync(filename, { encoding: 'utf-8' });
    const body = ejs.render(templateString, { ...dto.variables });

    await this.mailerProvider.sendEmail(
      dto.to,
      dto.subject,
      body,
      dto.variables,
      dto.attachments || [],
    );
  }
}
