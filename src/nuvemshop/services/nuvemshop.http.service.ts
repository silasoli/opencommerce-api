import { HttpService } from '@nestjs/axios';
import { Injectable, HttpException, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { NuvemshopError } from '../types/NuvemshopError.type';
import { NUVEMSHOP_ERRORS } from '../constants/nuvemshop.errors';

@Injectable()
export class NuvemshopHttpService {
  private readonly logger = new Logger(NuvemshopHttpService.name);

  constructor(private readonly httpService: HttpService) {}

  async get<T>(url: string, headers?: Record<string, string>): Promise<T> {
    return this.request<T>('get', url, undefined, headers);
  }

  async post<T, D>(
    url: string,
    data: D,
    headers?: Record<string, string>,
  ): Promise<T> {
    return this.request<T>('post', url, data, headers);
  }

  async put<T, D>(
    url: string,
    data: D,
    headers?: Record<string, string>,
  ): Promise<T> {
    return this.request<T>('put', url, data, headers);
  }

  async delete<T>(url: string, headers?: Record<string, string>): Promise<T> {
    return this.request<T>('delete', url, undefined, headers);
  }

  private async request<T>(
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    data?: unknown,
    headers?: Record<string, string>,
  ): Promise<T> {
    try {
      const response = await this.httpService.axiosRef.request<T>({
        method,
        url,
        data,
        headers,
      });

      this.logger.log(`REQUISIÇÃO REALIZADA COM SUCESSO: ${method} ${url}`);

      return response.data;
    } catch (error) {
      this.logger.log(`ERRO NA REQUISIÇÃO: ${method} ${url} - ${error}`);

      if (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        error.response.data.code === 404 &&
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        error.response.data.description === 'Last page is 0'
      ) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return [] as any;
      }

      this.handleError(error);
    }
  }

  private handleError(error: unknown): never {
    if (error instanceof AxiosError && error.response) {
      const nuvemshopError = error as NuvemshopError;
      const statusCode = nuvemshopError.response.status;
      const responseData = nuvemshopError.response.data;

      console.log(nuvemshopError.response.data);
      console.log(nuvemshopError.response.status);

      if (!responseData) {
        throw new HttpException(
          NUVEMSHOP_ERRORS.UNKNOWN_ERROR.message,
          statusCode,
        );
      }

      const { description } = nuvemshopError.response.data;

      const errorMessages = Object.entries(responseData)
        .map(
          ([field, messages]) =>
            `${field}: ${(messages as unknown as string[]).join(', ')}`,
        )
        .join(' | ');

      throw new HttpException(errorMessages || description, statusCode);
    }

    throw NUVEMSHOP_ERRORS.UNKNOWN_ERROR;
  }
}
