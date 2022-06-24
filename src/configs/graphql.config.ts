import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
export const graphqlConfig = GraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver,
  cors: {
    credential: true,
    origin: '*',
  },
  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  sortSchema: true,
  buildSchemaOptions: { dateScalarMode: 'isoDate' },
  context: ({ req, res }) => ({ headers: req.headers, req: req, res: res }),
});
