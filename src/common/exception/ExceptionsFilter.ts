import {
  ExceptionFilter,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common/interfaces';
import { GqlExecutionContext } from '@nestjs/graphql';
@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  constructor() {}
  catch(exception: HttpException | Error, context: ExecutionContext): void {
    // Handling error message and logging
    this.handleMessage(exception);
    // Response to client
    ExceptionsFilter.handleResponse(exception, context);
  }

  private handleMessage(exception: unknown): void {
    let message = 'Internal Server Error';
    if (exception instanceof HttpException) {
      message = JSON.stringify(exception.getResponse());
    } else if (exception instanceof Error) {
      message = exception.stack.toString();
    }
  }

  private static handleResponse(
    exception: HttpException | Error,
    context: ExecutionContext,
  ): void {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const response = ctx.getContext().res;
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    response.status(status).json({
      statusCode: status,
      message: exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
