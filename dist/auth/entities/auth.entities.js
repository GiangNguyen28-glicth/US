"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshResponse = exports.RefreshPayload = exports.JwtPayload = exports.IJwtPayload = void 0;
const graphql_1 = require("@nestjs/graphql");
let IJwtPayload = class IJwtPayload {
};
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], IJwtPayload.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], IJwtPayload.prototype, "email", void 0);
IJwtPayload = __decorate([
    (0, graphql_1.ObjectType)()
], IJwtPayload);
exports.IJwtPayload = IJwtPayload;
let JwtPayload = class JwtPayload {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], JwtPayload.prototype, "accessToken", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], JwtPayload.prototype, "refreshToken", void 0);
JwtPayload = __decorate([
    (0, graphql_1.ObjectType)()
], JwtPayload);
exports.JwtPayload = JwtPayload;
class RefreshPayload {
}
exports.RefreshPayload = RefreshPayload;
class RefreshResponse {
}
exports.RefreshResponse = RefreshResponse;
//# sourceMappingURL=auth.entities.js.map