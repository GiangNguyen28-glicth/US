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
exports.CartResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const cart_service_1 = require("./cart.service");
const cart_input_1 = require("./dto/cart.input");
const cart_entities_1 = require("./entities/cart.entities");
const common_1 = require("@nestjs/common");
const at_guard_1 = require("../../common/guards/at.guard");
let CartResolver = class CartResolver {
    constructor(cartService) {
        this.cartService = cartService;
    }
    async getListItemCart(req) {
        return this.cartService.getListProducInCart(req);
    }
    async addItemToCart(input, req, res) {
        return this.cartService.addItemToCart(req, res, input);
    }
    async deleteItemCart(productId, req, res) {
        return this.cartService.deleteItem(req, res, productId);
    }
    async updateItemCart(input, req, res) {
        return this.cartService.updateItem(input, req, res);
    }
};
__decorate([
    (0, graphql_1.Query)(() => [cart_entities_1.LineItem]),
    __param(0, (0, graphql_1.Context)('req')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartResolver.prototype, "getListItemCart", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, graphql_1.Context)('req')),
    __param(2, (0, graphql_1.Context)('res')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cart_input_1.CartInput, Object, Object]),
    __metadata("design:returntype", Promise)
], CartResolver.prototype, "addItemToCart", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('productId')),
    __param(1, (0, graphql_1.Context)('req')),
    __param(2, (0, graphql_1.Context)('res')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], CartResolver.prototype, "deleteItemCart", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, graphql_1.Context)('req')),
    __param(2, (0, graphql_1.Context)('res')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cart_input_1.CartInput, Object, Object]),
    __metadata("design:returntype", Promise)
], CartResolver.prototype, "updateItemCart", null);
CartResolver = __decorate([
    (0, graphql_1.Resolver)(cart_entities_1.Cart.name),
    (0, common_1.UseGuards)(at_guard_1.AtGuard),
    __metadata("design:paramtypes", [cart_service_1.CartService])
], CartResolver);
exports.CartResolver = CartResolver;
//# sourceMappingURL=cart.resolver.js.map