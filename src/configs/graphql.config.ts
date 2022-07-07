import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ObjectIDResolver } from 'graphql-scalars';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

export const graphqlConfig = GraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver,
  cors: {
    credential: true,
    origin: '*',
  },
  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  sortSchema: true,
  buildSchemaOptions: { dateScalarMode: 'isoDate' },
  context: ({ req, res }) => ({ req, res }),
  formatError: (error: GraphQLError) => {
    const graphQLFormattedError: GraphQLFormattedError = {
      message: error.extensions?.exception['response'],
      extensions: {
        code: error.extensions.code,
        exception: {
          status: error.extensions.exception['status'],
          name: error.extensions.exception['name'],
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
});
