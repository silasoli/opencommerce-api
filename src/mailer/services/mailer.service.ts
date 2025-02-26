import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { render } from 'ejs';
import * as path from 'path';
import { MailgunProvider } from '../providers/mailgun.provider';
import { SendEmailWithTemplateDto } from '../dto/send-email-template.dto';
import { SendEmailWithTextDto } from '../dto/send-email-text.dto';
import { MAILER_ERRORS } from '../constants/mailer.errors';

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

    if (!fs.existsSync(templatePath)) throw MAILER_ERRORS.NOT_FOUND_TEMPLATE;

    const templateContent: string = fs.readFileSync(templatePath, 'utf-8');
    return render(templateContent, variables);
  }

  public async sendEmailWithTemplate(
    dto: SendEmailWithTemplateDto,
  ): Promise<void> {
    let html: string | null = null;

    if (dto.template) {
      html = this.loadTemplate(dto.template, dto.variables || {});
    }

    await this.mailgunProvider.sendEmail(dto.to, dto.subject, null, html);
  }

  public async sendEmailWithText(dto: SendEmailWithTextDto): Promise<void> {
    await this.mailgunProvider.sendEmail(dto.to, dto.subject, dto.text, null);
  }
}
