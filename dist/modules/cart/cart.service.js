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
    async addItemToCart(input, user) {
        let listProduct = [];
        let cart = await this.getCartByUserId(user);
        const product = await this.productService.getProductById(input.productId);
        if (cart.listItem.length > 0) {
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
            cart = await this.cartModel.findOneAndUpdate({ user: user._id.toString() }, { listItem: listProduct });
        }
        return true;
    }
    async getListProducInCart(user) {
        const listProduct = await this.getCartByUserId(user);
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
            throw new common_1.HttpException(`Kh??ng th??? ch???n s??? l?????ng v?????t qu?? s??? l?????ng s???n ph???m c??n l???i . ${product.name} ch??? c?? ${product.quantity} s???n ph???m`, common_1.HttpStatus.BAD_REQUEST);
        }
        const productOfCart = lineItem.filter(item => item.product._id.toString() === product._id.toString());
        if (productOfCart.length === 0) {
            return true;
        }
        const quantityCart = productOfCart[0].quantity;
        const totalQuantity = quantityCart + quantityAddToCart;
        if (totalQuantity > product.quantity) {
            throw new common_1.HttpException(`Kh??ng th??? th??m s???n ph???m n??y v???i s??? l?????ng ${quantityAddToCart} v?? trong gi??? h??ng
       ???? c?? s???n ph???m n??y v???i s??? l?????ng ${quantityCart} . B???n ch??? c?? th??m ${product.quantity - quantityCart} n???a`, common_1.HttpStatus.BAD_REQUEST);
        }
        return true;
    }
    async isValidCart(lineItem) {
        for (const item of lineItem) {
            const product = await this.productService.getProductById(item.product._id.toString());
            if (product.quantity < item.quantity) {
                throw new common_1.HttpException(`S???n ph???m ${item.product.name} s??? l?????ng s???n ph???m ch??? c??n ${product.quantity} s???n ph???m. Vui l??ng gi???m s??? l?????ng s???n ph???m n??y trong gi??? h??ng`, common_1.HttpStatus.BAD_REQUEST);
            }
        }
        return true;
    }
    async deleteItem(product, user) {
        try {
            let cart = await this.getListProducInCart(user);
            cart = cart.filter(item => {
                if (!product.includes(item.product._id.toString())) {
                    return item;
                }
            });
            await this.cartModel.findOneAndUpdate({ user: user._id }, { listItem: cart });
            return true;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateItem(input, user) {
        let cart = await this.getListProducInCart(user);
        const product = await this.productService.getProductById(input.productId);
        if (!this.checkProductInLineItem(input.productId, cart)) {
            return false;
        }
        if (input.quantity > product.quantity) {
            throw new common_1.HttpException(`Kh??ng th??? ch???n s??? l?????ng v?????t qu?? s??? l?????ng s???n ph???m c??n l???i . ${product.name} ch??? c?? ${product.quantity} s???n ph???m`, common_1.HttpStatus.BAD_REQUEST);
        }
        cart = cart.filter(element => {
            if (element.product._id.toString() == input.productId) {
                element.quantity = input.quantity;
                element.totalPrice = this.totalPriceOfItem(element.product, element.quantity);
            }
            return element;
        });
        await this.cartModel.findOneAndUpdate({ user: user._id }, { listItem: cart });
        return true;
    }
    async getCartByUserId(user) {
        try {
            let cart = await this.cartModel.findOne({ user: user._id.toString() });
            if (!cart) {
                cart = await this.cartModel.create({ user: user, listItem: [] });
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