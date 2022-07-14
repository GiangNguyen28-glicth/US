import { ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { ObjectIDResolver } from 'graphql-scalars';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { join } from 'path';
@Injectable()
export class GraphqlService implements GqlOptionsFactory {
  async createGqlOptions(): Promise<ApolloDriverConfig> {
    return {
      cors: {
        credentials: true,
        origin: ['http://localhost:2050'],
      },
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      buildSchemaOptions: { dateScalarMode: 'isoDate' },
      context: ({ req, res }) => ({ req, res }),

      debug: false,
      resolvers: {
        Upload: GraphQLUpload,
        ObjectID: ObjectIDResolver,
      },
    };
  }
}
