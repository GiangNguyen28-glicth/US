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
const graphql_scalars_1 = require("graphql-scalars");
const GraphQLUpload_js_1 = __importDefault(require("graphql-upload/GraphQLUpload.js"));
const path_1 = require("path");
let GraphqlService = class GraphqlService {
    async createGqlOptions() {
        return {
            cors: {
                credentials: true,
                origin: ['http://localhost:2050'],
            },
            autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/schema.gql'),
            sortSchema: true,
            buildSchemaOptions: { dateScalarMode: 'isoDate' },
            context: ({ req, res }) => ({ req, res }),
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