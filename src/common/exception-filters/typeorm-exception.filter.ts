import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { QueryFailedError, TypeORMError } from 'typeorm';

@Catch(TypeORMError, QueryFailedError)
export class TypeORMExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError | TypeORMError, host: ArgumentsHost) {
    console.log(exception);

    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const isQueryFailedError = exception instanceof QueryFailedError;
    const hasCode =
      isQueryFailedError && isObject(exception) && 'code' in exception;

    if (!hasCode) {
      return this.sendErrorResponse(
        response,
        HttpStatus.INTERNAL_SERVER_ERROR,
        request.url,
        'Erro de integridade com banco de dados',
        [],
      );
    }

    const errorCode = (exception as unknown as { code: string }).code;
    const errorInfo = this.getErrorInfo(errorCode);
    const field = errorInfo.extractFieldFromErrorMessage(exception);
    const message = field ? [errorInfo.messageByField(field)] : [];

    return this.sendErrorResponse(
      response,
      errorInfo.status,
      request.url,
      errorInfo.error,
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
        message,
        error,
        statusCode: status,
      },
    });
  }

  private getErrorInfo(code: string): TypeORMException {
    return (
      TypeORMErrors[code] || {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Internal server error',
        messageByField: (): string => 'Internal server error',
        extractFieldFromErrorMessage: (): undefined => undefined,
      }
    );
  }
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export type TypeORMException = {
  status: HttpStatus;
  error: string;
  messageByField: (field: string) => string;
  extractFieldFromErrorMessage: (
    exception: QueryFailedError | TypeORMError,
  ) => string | undefined;
};

export const TypeORMErrors: Record<string, TypeORMException> = {
  '23505': {
    status: HttpStatus.CONFLICT,
    error: 'Conflict',
    messageByField: (field: string): string => {
      return (
        TypeORMExceptionMessages['23505'][field] ||
        TypeORMExceptionMessages['23505'].default
      );
    },
    extractFieldFromErrorMessage: (
      exception: QueryFailedError | TypeORMError,
    ): string | undefined => {
      if (isObject(exception) && typeof exception['detail'] === 'string') {
        const match = exception['detail'].match(/Key \(([^)]+)\)=/);
        return match?.[1];
      }
      return undefined;
    },
  },
  '23502': {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'Unprocessable entity',
    messageByField: (field: string): string => {
      return (
        TypeORMExceptionMessages['23502'][field] ||
        TypeORMExceptionMessages['23502'].default
      );
    },
    extractFieldFromErrorMessage: (
      exception: QueryFailedError | TypeORMError,
    ): string | undefined => {
      if (isObject(exception) && typeof exception['message'] === 'string') {
        const match = exception['message'].match(
          /null value in column "(.*?)" of relation/,
        );
        return match?.[1];
      }
      return undefined;
    },
  },
  '42P01': {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'Relation does not exist',
    messageByField: (): string => {
      return TypeORMExceptionMessages['42P01'].default;
    },
    extractFieldFromErrorMessage: (): undefined => {
      return undefined;
    },
  },
};

export const TypeORMExceptionMessages: Record<
  string,
  Record<string, string>
> = {
  '23505': {
    username: 'O nome de usuário já está em uso.',
    email: 'Este endereço de e-mail já está em uso.',
    default: 'Erro de chave duplicada.',
  },
  '23502': {
    external_id: 'ID externo null não permitido.',
    default: 'Erro de campo nulo não permitido.',
  },
  '42P01': {
    default: 'A relação solicitada não existe.',
  },
};
