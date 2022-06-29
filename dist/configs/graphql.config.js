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
    context: ({ req, res }) => ({ req: req, res: res }),
    debug: false,
    csrfPrevention: true,
    resolvers: {
        Upload: GraphQLUpload_js_1.default,
        ObjectID: graphql_scalars_1.ObjectIDResolver,
    },
});
//# sourceMappingURL=graphql.config.js.map