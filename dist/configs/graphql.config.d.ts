import { ApolloDriverConfig } from '@nestjs/apollo';
import { GqlOptionsFactory } from '@nestjs/graphql';
export declare class GraphqlService implements GqlOptionsFactory {
    createGqlOptions(): Promise<ApolloDriverConfig>;
}
