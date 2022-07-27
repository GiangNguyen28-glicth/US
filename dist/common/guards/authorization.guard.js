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
exports.PermissionGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const graphql_1 = require("@nestjs/graphql");
const enum_1 = require("../../constants/enum");
let PermissionGuard = class PermissionGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        const request = ctx.getContext().req;
        const permissions = this.reflector.getAllAndOverride('permission', [context.getHandler()]);
        const user = request === null || request === void 0 ? void 0 : request.user;
        const isFullRole = user.permission.includes(enum_1.Permission.FULL);
        const isValidRole = permissions.every(item => user.permission.includes(item));
        console.log('oke :', isValidRole);
        return true;
    }
};
PermissionGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], PermissionGuard);
exports.PermissionGuard = PermissionGuard;
//# sourceMappingURL=authorization.guard.js.map