import {
  Catch,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
} from '@nestjs/common';
import { GqlContextType } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';

@Catch(HttpException)
export class GraphQLExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    if (host.getType<GqlContextType>() != 'graphql') {
      throw exception;
    }
    const error: ApolloError = new ApolloError(exception.message);
    // error.stack = exception.stack;
    error.extensions['response'] = {
      status: +exception.getStatus().toString(),
      message: exception.getResponse().toString(),
    };
    throw error;
  }
}
