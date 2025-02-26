/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { SendMessageMailgunResponse } from '../types/SendMessageMailgunResponse.types';
import { SERVER_ERRORS } from '../../common/constants/server.errors';

@Injectable()
export class MailgunProvider {
  private MAILGUN_API_KEY: string | undefined;
  private MAILGUN_DOMAIN: string | undefined;
  private API_URL: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.MAILGUN_API_KEY = this.configService.get<string>('MAILGUN_API_KEY');
    this.MAILGUN_DOMAIN = this.configService.get<string>('MAILGUN_DOMAIN');

    if (!this.MAILGUN_API_KEY || !this.MAILGUN_DOMAIN) {
      throw SERVER_ERRORS.NOT_FOUND_PORT;
    }

    this.API_URL = `https://api.mailgun.net/v3/${this.MAILGUN_DOMAIN}/messages`;
  }

  async sendEmail(
    to: string,
    subject: string,
    text: string | null,
    html: string | null,
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
      const response = await this.httpService.axiosRef.post(
        this.API_URL,
        data,
        {
          headers: {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      return response.data as AxiosResponse<SendMessageMailgunResponse>;
    } catch (error) {
      const statusCode = error.response.status;
      const errors = error.response.data;
      throw new HttpException({ ...errors }, statusCode);
    }
  }
}
