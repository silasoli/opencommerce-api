import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { AxiosError } from 'axios';
import { VIACEP_ERRORS } from '../constants/viacep.errors';

@Injectable()
export class ViaCepHttpService {
  private readonly logger = new Logger(ViaCepHttpService.name);

  constructor(private readonly httpService: HttpService) {}

  async get<T>(url: string): Promise<T> {
    return this.request<T>('get', url);
  }

  private async request<T>(method: 'get', url: string): Promise<T> {
    try {
      const response = await this.httpService.axiosRef.request<T>({
        method,
        url,
      });

      if (
        response.data &&
        typeof response.data === 'object' &&
        'erro' in response.data
      ) {
        this.logger.error(JSON.stringify(response.data));
        throw VIACEP_ERRORS.NOT_FOUND;
      }

      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: unknown): never {
    if (error instanceof NotFoundException) throw VIACEP_ERRORS.NOT_FOUND;

    if (
      error instanceof AxiosError &&
      typeof error.response?.data === 'string' &&
      error.response.data.includes('<html')
    ) {
      this.logger.error(JSON.stringify(error.response.data));
      throw VIACEP_ERRORS.INVALID_PARAM;
    }

    this.logger.error(JSON.stringify(error));
    throw VIACEP_ERRORS.UNKNOWN_ERROR;
  }
}
