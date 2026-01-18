import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;

    this.logger.log(`Incoming Request on ${url} | Method: ${method}`);

    return next.handle().pipe(
      tap({
        next: () => {
          const response = context.switchToHttp().getResponse();
          this.logger.log(
            `Request to ${url} completed with status ${response.statusCode} in ${Date.now() - now}ms`,
          );
        },
        error: (error) =>
          this.logger.error(
            `Request to ${url} failed in ${Date.now() - now}ms`,
            error.stack,
          ),
      }),
    );
  }
}
