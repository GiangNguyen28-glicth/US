"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQLExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const apollo_server_express_1 = require("apollo-server-express");
const apolloPredefinedExceptions = {
    401: apollo_server_express_1.AuthenticationError,
    403: apollo_server_express_1.ForbiddenError,
};
let GraphQLExceptionFilter = class GraphQLExceptionFilter {
    catch(exception, host) {
        let error;
        if (exception.getStatus() in apolloPredefinedExceptions) {
            error = new apolloPredefinedExceptions[exception.getStatus()](exception.message);
        }
        else {
            error = new apollo_server_express_1.ApolloError(exception.message, exception.getStatus().toString());
        }
        error.stack = exception.stack;
        error.extensions['response'] = exception.getResponse();
        throw error;
    }
};
GraphQLExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException)
], GraphQLExceptionFilter);
exports.GraphQLExceptionFilter = GraphQLExceptionFilter;
//# sourceMappingURL=GraphQLExceptionFilter.js.map