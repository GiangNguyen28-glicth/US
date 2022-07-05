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
exports.OrderResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const order_input_1 = require("./dto/order.input");
const order_entities_1 = require("./entities/order.entities");
const order_service_1 = require("./order.service");
const common_1 = require("@nestjs/common");
const at_guard_1 = require("../../common/guards/at.guard");
const getuser_decorator_1 = require("../../common/decorators/getuser.decorator");
const user_entities_1 = require("../user/entities/user.entities");
let OrderResolver = class OrderResolver {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async createOrder(input, req, res, user) {
        return this.orderService.createOrder(input, req, res, user);
    }
};
__decorate([
    (0, common_1.UseGuards)(at_guard_1.AtGuard),
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, graphql_1.Context)('req')),
    __param(2, (0, graphql_1.Context)('res')),
    __param(3, (0, getuser_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_input_1.CreateOrderInput, Object, Object, user_entities_1.User]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "createOrder", null);
OrderResolver = __decorate([
    (0, graphql_1.Resolver)(order_entities_1.Order.name),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderResolver);
exports.OrderResolver = OrderResolver;
//# sourceMappingURL=order.resolver.js.map