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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const mail_service_1 = require("./mail.service");
let MailResolver = class MailResolver {
    constructor(mailService) {
        this.mailService = mailService;
    }
    confirmMail(email, code) {
        return this.mailService.confirmEmail(email, code);
    }
};
__decorate([
    (0, graphql_1.Query)(() => Boolean),
    __param(0, (0, graphql_1.Args)('email')),
    __param(1, (0, graphql_1.Args)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], MailResolver.prototype, "confirmMail", null);
MailResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [mail_service_1.MailService])
], MailResolver);
exports.MailResolver = MailResolver;
//# sourceMappingURL=mail.resolver.js.map