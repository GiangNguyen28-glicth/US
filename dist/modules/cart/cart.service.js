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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("../product/product.service");
let CartService = class CartService {
    constructor(productService) {
        this.productService = productService;
    }
    async addItemToCart(req, res, productId) {
        let listProduct = [];
        const product = await this.productService.getProductById(productId);
        const cookie = req.cookies;
        console.log(req);
        res.cookie('testCookie', 'Hello', {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: req.headers['x-forwarded-proto'] === 'https',
            sameSite: 'none',
        });
        return listProduct;
    }
};
CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], CartService);
exports.CartService = CartService;
//# sourceMappingURL=cart.service.js.map