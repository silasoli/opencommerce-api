import { HttpService } from '@nestjs/axios';
import { Injectable, HttpException } from '@nestjs/common';

@Injectable()
export class NuvemshopHttpService {
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

  private async request<T>(
    method: 'get' | 'post' | 'put',
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
      return response.data;
    } catch (error) {
      console.log(error);
      throw new HttpException('erro nuvem', 400);

      // this.handleError(error);
    }
  }

  // private handleError(error: unknown): never {
  //   if (error instanceof AxiosError && error.response) {
  //     const assasError = error as AsaasError;
  //     const statusCode = assasError.response.status;

  //     if (!assasError.response.data.errors) {
  //       throw new HttpException(ASAAS_ERRORS.UNKNOWN_ERROR.message, statusCode);
  //     }

  //     const errors = assasError.response.data.errors[0];
  //     throw new HttpException(errors, statusCode);
  //   }
  //   throw ASAAS_ERRORS.UNKNOWN_ERROR;
  // }
}
