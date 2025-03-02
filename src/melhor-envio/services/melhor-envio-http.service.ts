import { HttpService } from '@nestjs/axios';
import { Injectable, HttpException, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { MelhorEnvioError } from '../types/melhor-envio-error.type';
import { MELHOR_ENVIO_ERRORS } from '../constants/melhor-envio.errors';

@Injectable()
export class MelhorEnvioHttpService {
  private readonly logger = new Logger(MelhorEnvioHttpService.name);

  constructor(private readonly httpService: HttpService) {}

  async post<T, D>(
    url: string,
    data: D,
    headers?: Record<string, string>,
  ): Promise<T> {
    return this.request<T>('post', url, data, headers);
  }

  private async request<T>(
    method: 'post',
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
      console.log(error.response);
      const melhorEnvioError = error as MelhorEnvioError;
      const statusCode = melhorEnvioError.response.status;

      if (!melhorEnvioError.response.data.message) {
        throw new HttpException(
          MELHOR_ENVIO_ERRORS.UNKNOWN_ERROR.message,
          statusCode,
        );
      }

      const errorMessage = melhorEnvioError.response.data;

      this.logger.error(
        `Erro na requisição para Melhor Envio: ${JSON.stringify(errorMessage)}`,
      );

      throw new HttpException(errorMessage, statusCode);
    }

    throw MELHOR_ENVIO_ERRORS.UNKNOWN_ERROR;
  }
}
