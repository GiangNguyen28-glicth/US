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
exports.UpdateUserInput = exports.CreateUserInput = exports.FilterGetOneUser = void 0;
const graphql_1 = require("@nestjs/graphql");
const auth_input_1 = require("../../../auth/dto/auth.input");
const enum_1 = require("../../../constants/enum");
let FilterGetOneUser = class FilterGetOneUser {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], FilterGetOneUser.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], FilterGetOneUser.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], FilterGetOneUser.prototype, "keyword", void 0);
FilterGetOneUser = __decorate([
    (0, graphql_1.InputType)()
], FilterGetOneUser);
exports.FilterGetOneUser = FilterGetOneUser;
let CreateUserInput = class CreateUserInput {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateUserInput.prototype, "username", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateUserInput.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateUserInput.prototype, "password", void 0);
__decorate([
    (0, graphql_1.Field)(() => enum_1.GenderEnum, { nullable: true }),
    __metadata("design:type", String)
], CreateUserInput.prototype, "gender", void 0);
__decorate([
    (0, graphql_1.Field)(() => enum_1.RoleEnum, { nullable: true }),
    __metadata("design:type", Boolean)
], CreateUserInput.prototype, "role", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], CreateUserInput.prototype, "verifyEmail", void 0);
CreateUserInput = __decorate([
    (0, graphql_1.InputType)()
], CreateUserInput);
exports.CreateUserInput = CreateUserInput;
let UpdateUserInput = class UpdateUserInput extends auth_input_1.BaseUser {
};
UpdateUserInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateUserInput);
exports.UpdateUserInput = UpdateUserInput;
//# sourceMappingURL=user.input.js.map