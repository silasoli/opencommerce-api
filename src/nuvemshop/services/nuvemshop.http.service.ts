import { HttpService } from '@nestjs/axios';
import { Injectable, HttpException } from '@nestjs/common';
import { AxiosError } from 'axios';
import { NuvemshopError } from '../types/NuvemshopError.type';
import { NUVEMSHOP_ERRORS } from '../constants/nuvemshop.errors';

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
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: unknown): never {
    if (error instanceof AxiosError && error.response) {
      const nuvemshopError = error as NuvemshopError;
      const statusCode = nuvemshopError.response.status;

      if (!nuvemshopError.response.data) {
        throw new HttpException(
          NUVEMSHOP_ERRORS.UNKNOWN_ERROR.message,
          statusCode,
        );
      }

      const { description } = nuvemshopError.response.data;
      throw new HttpException(description, statusCode);
    }

    throw NUVEMSHOP_ERRORS.UNKNOWN_ERROR;
  }
}
