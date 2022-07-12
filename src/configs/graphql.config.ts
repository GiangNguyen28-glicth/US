import { ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { ObjectIDResolver } from 'graphql-scalars';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { join } from 'path';
@Injectable()
export class GraphqlService implements GqlOptionsFactory {
  async createGqlOptions(): Promise<ApolloDriverConfig> {
    return {
      cors: {
        credential: true,
        origin: '*',
      },
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      buildSchemaOptions: { dateScalarMode: 'isoDate' },
      context: ({ req, res }) => ({ req, res }),
      formatError: (error: GraphQLError) => {
        if (error?.originalError?.name !== 'HttpException') {
          return new GraphQLError(error.message, {
            path: error.path,
            extensions: {
              code: error.extensions.code,
            },
          });
        }
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error.message,
          extensions: {
            code: error.extensions.code,
            exception: {
              status: error.extensions?.exception['status'],
              name: error.extensions?.exception['name'],
              response: error.extensions?.exception['response'],
            },
          },
          path: error.path,
        };
        return graphQLFormattedError;
      },
      debug: false,
      resolvers: {
        Upload: GraphQLUpload,
        ObjectID: ObjectIDResolver,
      },
    };
  }
}
