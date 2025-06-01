import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { EntityNotFoundError } from 'typeorm';

@Catch(EntityNotFoundError)
export class EntityNotFoundExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(EntityNotFoundExceptionFilter.name);

  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const field = this.extractFieldFromErrorMessage(exception.message);

    const message =
      field && TypeORMExceptionMessages[field]
        ? [TypeORMExceptionMessages[field]]
        : ['Recurso não encontrado.'];

    this.logger.warn(`Entity not found: ${exception.message}`);

    return this.sendErrorResponse(
      response,
      HttpStatus.NOT_FOUND,
      request.url,
      'Entidade não encontrada.',
      message,
    );
  }

  private sendErrorResponse(
    response: Response,
    status: HttpStatus,
    path: string,
    error: string,
    message: string[],
  ): void {
    response.status(status).json({
      timestamp: new Date().toISOString(),
      path: path,
      error: {
        message: message || [error],
        // error: error,
        statusCode: status,
      },
    });
  }

  private extractFieldFromErrorMessage(message: string): string | null {
    if (!message) return null;
    const match = message.match(/entity of type "([^"]+)"/i);
    return match
      ? match[1].replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()
      : null;
  }
}

export const TypeORMExceptionMessages: Record<string, string> = {
  product: 'Produto não encontrado.',
  orders: 'Pedido nao encontrado.',
};
