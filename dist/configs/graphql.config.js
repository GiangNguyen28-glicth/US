"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphqlConfig = void 0;
const apollo_1 = require("@nestjs/apollo");
const graphql_1 = require("@nestjs/graphql");
const path_1 = require("path");
const graphql_scalars_1 = require("graphql-scalars");
const GraphQLUpload_js_1 = __importDefault(require("graphql-upload/GraphQLUpload.js"));
exports.graphqlConfig = graphql_1.GraphQLModule.forRoot({
    driver: apollo_1.ApolloDriver,
    cors: {
        credential: true,
        origin: '*',
    },
    autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/schema.gql'),
    sortSchema: true,
    buildSchemaOptions: { dateScalarMode: 'isoDate' },
    context: ({ req, res }) => ({ req, res }),
    formatError: (error) => {
        var _a;
        const graphQLFormattedError = {
            message: (_a = error.extensions) === null || _a === void 0 ? void 0 : _a.exception['response'],
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
        Upload: GraphQLUpload_js_1.default,
        ObjectID: graphql_scalars_1.ObjectIDResolver,
    },
});
//# sourceMappingURL=graphql.config.js.map