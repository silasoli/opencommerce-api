/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { SendMessageMailgunResponse } from '../types/SendMessageMailgunResponse.types';

@Injectable()
export class MailgunProvider {
  private MAILGUN_API_KEY: string | undefined;
  private MAILGUN_DOMAIN: string | undefined;
  private apiUrl: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.MAILGUN_API_KEY = this.configService.get<string>('MAILGUN_API_KEY');
    this.MAILGUN_DOMAIN = this.configService.get<string>('MAILGUN_DOMAIN');

    if (!this.MAILGUN_API_KEY || !this.MAILGUN_DOMAIN) {
      throw new Error(
        'Mailgun API Key or MAILGUN_DOMAIN is missing in environment variables.',
      );
    }

    this.apiUrl = `https://api.mailgun.net/v3/${this.MAILGUN_DOMAIN}/messages`;
  }

  async sendEmail(
    to: string,
    subject: string,
    text?: string,
    html?: string,
  ): Promise<AxiosResponse<SendMessageMailgunResponse>> {
    const auth = Buffer.from(`api:${this.MAILGUN_API_KEY}`).toString('base64');
    const fromEmail = `no-reply-opencommerce@${this.MAILGUN_DOMAIN}`;

    const data = new URLSearchParams();
    data.append('from', `Open Commerce <${fromEmail}>`);
    data.append('to', to);
    data.append('subject', subject);
    if (text) data.append('text', text);
    if (html) data.append('html', html);

    try {
      const response = await this.httpService.axiosRef.post(this.apiUrl, data, {
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      return response.data as AxiosResponse<SendMessageMailgunResponse>;
    } catch (error) {
      const statusCode = error.response.status;
      const errors = error.response.data;
      throw new HttpException({ ...errors }, statusCode);
    }
  }
}
