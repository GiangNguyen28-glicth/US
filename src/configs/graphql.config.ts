import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ObjectIDResolver } from 'graphql-scalars';
export const graphqlConfig = GraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver,
  cors: {
    credential: true,
    origin: '*',
  },
  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  sortSchema: true,
  buildSchemaOptions: { dateScalarMode: 'isoDate' },
  context: ({ req, res }) => ({ req: req, res: res }),
  debug: false,
  resolvers: {
    ObjectID: ObjectIDResolver,
  },
});
