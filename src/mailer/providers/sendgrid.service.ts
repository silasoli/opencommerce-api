import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { IMailerProvider } from '../interfaces/IMailer.interface';

@Injectable()
export class SendGridService implements IMailerProvider {
  private readonly apiKey = process.env.SENDGRID_API_KEY;
  private readonly from = process.env.SENDGRID_FROM;
  private readonly baseUrl = 'https://api.sendgrid.com/v3/mail/send';

  async sendEmail(
    to: string,
    subject: string,
    template: string,
    variables: Record<string, any>,
    attachments?: Array<{ filename: string; path: string }>
  ): Promise<void> {
    try {
      const payload = {
        personalizations: [
          {
            to: [{ email: to }],
            dynamic_template_data: variables,
          },
        ],
        from: { email: this.from },
        template_id: template,
        attachments: attachments?.map((file) => ({
          content: file.path,
          filename: file.filename,
        })),
      };

      await axios.post(this.baseUrl, payload, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Erro ao enviar e-mail pelo SendGrid:', error);
      throw new Error('Erro ao enviar e-mail');
    }
  }
}