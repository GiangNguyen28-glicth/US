import { ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { join } from 'path';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';

@Injectable()
export class GraphqlService implements GqlOptionsFactory {
  async createGqlOptions(): Promise<ApolloDriverConfig> {
    return {
      cors: {
        credentials: true,
        origin: '*',
      },
      context: ({ req, res }) => ({ req, res }),
      debug: false,
      autoSchemaFile: join(process.cwd(), '../../../tmp/schema.gql'),
      subscriptions: { 'graphql-ws': true },
      sortSchema: true,
      cache: 'bounded',
      resolvers: {
        Upload: GraphQLUpload,
      },
      playground: true,
      introspection: true,
      formatError: (error: any) => {
        // Graphql Error
        const formattedError = {
          message: error.message,
          code: error?.extensions?.code || 'INTERNAL_SERVER_ERROR',
        };

        const extensions = error?.extensions || null;
        // Http exception
        if (extensions?.exception?.status) {
          formattedError['statusCode'] = extensions.exception.status || 500;
          delete formattedError.code;

          // Class Validator Error
        } else if (extensions?.response?.statusCode) {
          const response = extensions.response;
          formattedError.message = response?.message || error.message;
          formattedError['statusCode'] = response?.statusCode || 500;
          delete formattedError.code;

          // Mongo Error
          // 1. Duplicate document by index
        } else if (
          extensions?.exception?.code === 11000 ||
          error.message.match(/E11000/)
        ) {
          formattedError.message = 'Duplicate document';
          formattedError['statusCode'] = 409;
          delete formattedError.code;
        }

        return formattedError;
      },
    };
  }
}
