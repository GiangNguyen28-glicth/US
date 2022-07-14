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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const product_service_1 = require("../product/product.service");
const cart_entities_1 = require("./entities/cart.entities");
let CartService = class CartService {
    constructor(cartModel, productService) {
        this.cartModel = cartModel;
        this.productService = productService;
    }
    async addItemToCart(req, res, input) {
        let listProduct = [];
        let cart;
        const product = await this.productService.getProductById(input.productId);
        const cookie = req.cookies.cartId;
        console.log('Cookie:', req.headers);
        if (this.checkCookie(cookie)) {
            cart = await this.getCartById(cookie);
            listProduct = cart.listItem;
            await this.isValidQuantityProduct(input.quantity, product, listProduct);
            const productExisting = listProduct.filter(item => {
                if (item.product._id.toString() === input.productId) {
                    item.quantity = item.quantity + input.quantity;
                    item.totalPrice = this.totalPriceOfItem(item.product, item.quantity);
                    return product;
                }
            });
            if (productExisting.length == 0) {
                listProduct.push({
                    product: product,
                    quantity: input.quantity,
                    totalPrice: this.totalPriceOfItem(product, input.quantity),
                });
            }
            await this.cartModel.findOneAndUpdate({ _id: cart._id }, { listItem: listProduct });
        }
        else {
            await this.isValidQuantityProduct(input.quantity, product, listProduct);
            listProduct.push({
                product: product,
                quantity: input.quantity,
                totalPrice: this.totalPriceOfItem(product, input.quantity),
            });
            cart = await this.cartModel.create({ listItem: listProduct });
        }
        const abc = res.cookie('cartId', cart._id, this.optionCookie(req));
        console.log('CookieRes:', abc);
        return true;
    }
    async getListProducInCart(request) {
        const listProduct = await this.getCartById(request.cookies.cartId);
        return listProduct.listItem ? listProduct.listItem : [];
    }
    totalQuantity(req) {
        const listProduct = req.cookies.listProduct;
        let totalQuantity = 0;
        listProduct.forEach(lineItem => (totalQuantity = totalQuantity + lineItem.quantity));
        return totalQuantity;
    }
    totalPrice(req) {
        const listProduct = req.cookies.listProduct;
        let totalPrice = 0;
        listProduct.forEach(lineItem => (totalPrice = lineItem.totalPrice + totalPrice));
        return totalPrice;
    }
    async isValidQuantityProduct(quantityAddToCart, product, lineItem) {
        if (quantityAddToCart > product.quantity) {
            throw new common_1.HttpException('Không thể chọn số lượng vượt quá số lượng sản phẩm còn lại', common_1.HttpStatus.BAD_REQUEST);
        }
        const productOfCart = lineItem.filter(item => item.product._id === product._id.toString());
        if (productOfCart.length === 0) {
            return true;
        }
        const quantityCart = productOfCart[0].quantity;
        const totalQuantity = quantityCart + quantityAddToCart;
        if (totalQuantity > product.quantity) {
            throw new common_1.HttpException(`Không thể thêm sản phẩm này với số lượng ${quantityAddToCart} vì trong giỏ hàng
       đã có sản phẩm này với số lượng ${quantityCart} . Bạn chỉ có thêm ${product.quantity - quantityCart} nữa`, common_1.HttpStatus.BAD_REQUEST);
        }
        return true;
    }
    async isValidCart(lineItem) {
        for (const item of lineItem) {
            const product = await this.productService.getProductById(item.product._id.toString());
            if (product.quantity < item.quantity) {
                throw new common_1.HttpException(`Sản phẩm ${item.product.name} số lượng sản phẩm chỉ còn ${product.quantity} sản phẩm. Vui lòng giảm số lượng sản phẩm này trong giỏ hàng`, common_1.HttpStatus.BAD_REQUEST);
            }
        }
        return true;
    }
    async deleteItem(req, res, productId) {
        try {
            let cart = await this.getListProducInCart(req);
            if (!this.checkProductInLineItem(productId, cart)) {
                return false;
            }
            cart = cart.filter(item => item.product._id.toString() !== productId);
            await this.cartModel.findOneAndUpdate({ _id: req.cookies.cartId }, { listItem: cart });
            res.cookie('cartId', req.cookies.cartId, this.optionCookie(req));
            return true;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateItem(input, req, res) {
        let cart = await this.getListProducInCart(req);
        if (!this.checkProductInLineItem(input.productId, cart)) {
            return false;
        }
        cart = cart.filter(element => {
            if (element.product._id.toString() == input.productId) {
                element.quantity = input.quantity;
                element.totalPrice = this.totalPriceOfItem(element.product, element.quantity);
            }
            return element;
        });
        await this.cartModel.findOneAndUpdate({ _id: req.cookies.cartId }, { listItem: cart });
        res.cookie('cartId', req.cookies.cartId, this.optionCookie(req));
        return true;
    }
    async getCartById(cartId) {
        try {
            const cart = await this.cartModel.findOne({ _id: cartId });
            if (!cart) {
                throw new common_1.HttpException('Giỏ hàng không tồn tại', common_1.HttpStatus.NOT_FOUND);
            }
            return cart;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteCart(response) {
        await this.cartModel.findOneAndDelete();
        response.clearCookie('cartId');
    }
    totalPriceOfItem(product, quantity) {
        const totalPrice = parseInt(product.price.toString()) * quantity;
        return totalPrice;
    }
    checkCookie(cookie) {
        if (cookie != undefined && (cookie === null || cookie === void 0 ? void 0 : cookie.lenght) != 0) {
            return true;
        }
        return false;
    }
    optionCookie(req) {
        return {
            path: '/',
            httpOnly: true,
            expires: new Date(Date.now() + 90000000),
            secure: req.headers['x-forwarded-proto'] === 'https',
            sameSite: 'none',
        };
    }
    checkProductInLineItem(productId, listProduct) {
        return listProduct.some(element => element.product._id !== productId);
    }
};
CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(cart_entities_1.Cart.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        product_service_1.ProductService])
], CartService);
exports.CartService = CartService;
//# sourceMappingURL=cart.service.js.map