import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface ErrorResponse {
  statusCode: number;
  message: string | string[];
  error?: string;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    const errorResponse: ErrorResponse = {
      statusCode: status,
      message: ['Internal server error'],
    };

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const responseData = exception.getResponse();

      if (typeof responseData === 'string') {
        errorResponse.message = [responseData];
      } else if (typeof responseData === 'object' && responseData !== null) {
        const { message, error } = responseData as {
          message: string | string[];
          error?: string;
        };

        errorResponse.message = Array.isArray(message) ? message : [message];
        if (error) errorResponse.error = error;
      }
    }

    this.logger.error(
      `Http Status: ${status} Error Message: ${JSON.stringify({ ...errorResponse, statusCode: status })}`,
    );

    response.status(status).json({
      timestamp: new Date().toISOString(),
      path: request.url,
      error: { ...errorResponse, statusCode: status },
    });
  }
}
