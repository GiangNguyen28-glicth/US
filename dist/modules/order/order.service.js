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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_entities_1 = require("./entities/order.entities");
const cart_service_1 = require("../cart/cart.service");
const product_service_1 = require("../product/product.service");
const order_item_service_1 = require("../order-item/order-item.service");
let OrderService = class OrderService {
    constructor(oderModel, cartService, productService, orderItemService) {
        this.oderModel = oderModel;
        this.cartService = cartService;
        this.productService = productService;
        this.orderItemService = orderItemService;
    }
    async createOrder(input, req, res, user) {
        const carts = await this.cartService.getListProductInCookie(req);
        const { username, phonenumber, address } = input;
        const totalPrice = this.cartService.totalPrice(req);
        const totalQuantity = this.cartService.totalQuantity(req);
        const isValidCart = await this.cartService.isValidCart(carts);
        if (isValidCart) {
            const order = await this.oderModel.create({
                user: user._id,
                username,
                phonenumber,
                address,
                totalQuantity,
                totalPrice,
            });
            Promise.all([
                this.updateQuantityProductAfterOrder(carts),
                ,
                this.createOrderItemAfterOrder(carts, order._id),
            ]);
            this.cartService.deleteCart(res);
        }
        return true;
    }
    async quantityProductAfterOrder(productId, quantityCart) {
        const product = await this.productService.getProductById(productId);
        const quantityProductAfterOrder = product.quantity - quantityCart;
        return quantityProductAfterOrder;
    }
    async updateQuantityProductAfterOrder(lineItem) {
        for (const item of lineItem) {
            const quantityProductAfterOrder = await this.quantityProductAfterOrder(item.product._id.toString(), item.quantity);
            await this.productService.updateProduct(item.product._id.toString(), {
                quantity: quantityProductAfterOrder,
            });
        }
    }
    async createOrderItemAfterOrder(lineItem, orderId) {
        for (const item of lineItem) {
            await this.orderItemService.createOrderItem({
                productId: item.product._id.toString(),
                orderId,
                quantity: item.quantity,
                totalPrice: item.totalPrice,
            });
        }
    }
    async updateOrder() {
        return true;
    }
    async getOne(orderid) {
        const order = await this.oderModel.findOne({ _id: orderid });
        return order;
    }
};
OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_entities_1.Order.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        cart_service_1.CartService,
        product_service_1.ProductService,
        order_item_service_1.OrderItemService])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map