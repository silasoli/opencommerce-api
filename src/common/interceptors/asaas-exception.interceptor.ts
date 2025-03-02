import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpException } from '@nestjs/common';
import { AsaasError } from '../../asaas/types/asaas/AsaasError.types';

@Injectable()
export class AsaasExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof AxiosError && error.response) {
          const assasError = error as AsaasError;
          const statusCode = assasError.response.status;
          const errors = assasError.response.data.errors[0];
          return throwError(() => new HttpException(errors, statusCode));
        }

        return throwError(() => new HttpException('Unexpected error', 500));
      }),
    );
  }
}
