"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphqlConfig = void 0;
const apollo_1 = require("@nestjs/apollo");
const graphql_1 = require("@nestjs/graphql");
const path_1 = require("path");
const graphql_scalars_1 = require("graphql-scalars");
exports.graphqlConfig = graphql_1.GraphQLModule.forRoot({
    driver: apollo_1.ApolloDriver,
    cors: {
        credential: true,
        origin: '*',
    },
    autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/schema.gql'),
    sortSchema: true,
    buildSchemaOptions: { dateScalarMode: 'isoDate' },
    context: ({ req, res }) => ({ headers: req.headers, req: req, res: res }),
    debug: false,
    resolvers: {
        ObjectID: graphql_scalars_1.ObjectIDResolver,
    },
});
//# sourceMappingURL=graphql.config.js.map