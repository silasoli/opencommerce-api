import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';
import * as FormData from 'form-data';
import { IMailerProvider } from '../interfaces/IMailer.interface';

@Injectable()
export class MailgunService implements IMailerProvider {
  private readonly apiKey = process.env.MAILGUN_API_KEY;
  private readonly domain = process.env.MAILGUN_DOMAIN;
  private readonly baseUrl = `https://api.mailgun.net/v3/${this.domain}`;
  private readonly from = process.env.MAILGUN_FROM;

  async sendEmail(
    to: string,
    subject: string,
    template: string,
    variables: Record<string, any>,
    attachments?: Array<{ filename: string; path: string }>,
  ): Promise<void> {
    try {
      const formData = new FormData();
      formData.append('from', this.from);
      formData.append('to', to);
      formData.append('subject', subject);
      formData.append('template', template);

      Object.keys(variables).forEach((key) => {
        formData.append(`v:${key}`, variables[key]);
      });

      if (attachments) {
        attachments.forEach((attachment) => {
          formData.append(
            'attachment',
            fs.createReadStream(attachment.path),
            attachment.filename,
          );
        });
      }

      await axios.post(`${this.baseUrl}/messages`, formData, {
        auth: {
          username: 'api',
          password: this.apiKey as string,
        },
        headers: formData.getHeaders(),
      });
    } catch (error) {
      console.error('Erro ao enviar e-mail pelo Mailgun:', error);
      throw new Error('Erro ao enviar e-mail');
    }
  }
}
