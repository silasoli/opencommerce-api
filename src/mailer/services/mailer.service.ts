import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { render } from 'ejs';
import * as path from 'path';
import { SendEmailDto } from '../dto/send-email.dto';
import { MailgunProvider } from '../providers/mailgun.provider';

@Injectable()
export class MailerService {
  constructor(private readonly mailgunProvider: MailgunProvider) {}

  private loadTemplate(
    templateName: string,
    variables: Record<string, any>,
  ): string {
    const templatePath = path.join(
      process.cwd(),
      'src/mailer/templates',
      `${templateName}.ejs`,
    );

    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template ${templateName} not found.`);
    }

    const templateContent: string = fs.readFileSync(templatePath, 'utf-8');
    return render(templateContent, variables);
  }

  async sendEmail(dto: SendEmailDto) {
    let html: string | undefined = undefined;

    if (dto.template) {
      html = this.loadTemplate(dto.template, dto.variables || {});
    }

    await this.mailgunProvider.sendEmail(dto.to, dto.subject, dto.text, html);
  }
}
