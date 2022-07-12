"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphqlService = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("graphql");
const graphql_scalars_1 = require("graphql-scalars");
const GraphQLUpload_js_1 = __importDefault(require("graphql-upload/GraphQLUpload.js"));
const path_1 = require("path");
let GraphqlService = class GraphqlService {
    async createGqlOptions() {
        return {
            cors: {
                credential: true,
                origin: '*',
            },
            autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/schema.gql'),
            sortSchema: true,
            buildSchemaOptions: { dateScalarMode: 'isoDate' },
            context: ({ req, res }) => ({ req, res }),
            formatError: (error) => {
                var _a, _b, _c, _d;
                if (((_a = error === null || error === void 0 ? void 0 : error.originalError) === null || _a === void 0 ? void 0 : _a.name) !== 'HttpException') {
                    return new graphql_1.GraphQLError(error.message, {
                        path: error.path,
                        extensions: {
                            code: error.extensions.code,
                        },
                    });
                }
                const graphQLFormattedError = {
                    message: error.message,
                    extensions: {
                        code: error.extensions.code,
                        exception: {
                            status: (_b = error.extensions) === null || _b === void 0 ? void 0 : _b.exception['status'],
                            name: (_c = error.extensions) === null || _c === void 0 ? void 0 : _c.exception['name'],
                            response: (_d = error.extensions) === null || _d === void 0 ? void 0 : _d.exception['response'],
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
        };
    }
};
GraphqlService = __decorate([
    (0, common_1.Injectable)()
], GraphqlService);
exports.GraphqlService = GraphqlService;
//# sourceMappingURL=graphql.config.js.map