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
exports.ResetPasswordInput = exports.RegisterInput = exports.LoginInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let LoginInput = class LoginInput {
};
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], LoginInput.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], LoginInput.prototype, "password", void 0);
LoginInput = __decorate([
    (0, graphql_1.InputType)()
], LoginInput);
exports.LoginInput = LoginInput;
let RegisterInput = class RegisterInput {
};
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], RegisterInput.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], RegisterInput.prototype, "password", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], RegisterInput.prototype, "confirmPassword", void 0);
RegisterInput = __decorate([
    (0, graphql_1.InputType)()
], RegisterInput);
exports.RegisterInput = RegisterInput;
let ResetPasswordInput = class ResetPasswordInput {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], ResetPasswordInput.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ResetPasswordInput.prototype, "code", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ResetPasswordInput.prototype, "password", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ResetPasswordInput.prototype, "confirmPassword", void 0);
ResetPasswordInput = __decorate([
    (0, graphql_1.InputType)()
], ResetPasswordInput);
exports.ResetPasswordInput = ResetPasswordInput;
//# sourceMappingURL=auth.dto.js.map