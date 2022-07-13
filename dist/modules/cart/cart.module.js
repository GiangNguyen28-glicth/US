"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const product_module_1 = require("../product/product.module");
const cart_resolver_1 = require("./cart.resolver");
const cart_service_1 = require("./cart.service");
const cart_entities_1 = require("./entities/cart.entities");
const cart_schema_1 = require("./schemas/cart.schema");
let CartModule = class CartModule {
};
CartModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: cart_entities_1.Cart.name,
                    useFactory: () => {
                        cart_schema_1.CartSchema.pre('save', function (next) {
                            return next();
                        });
                        return cart_schema_1.CartSchema;
                    },
                },
            ]),
            product_module_1.ProductModule,
        ],
        providers: [cart_resolver_1.CartResolver, cart_service_1.CartService],
        exports: [cart_service_1.CartService],
    })
], CartModule);
exports.CartModule = CartModule;
//# sourceMappingURL=cart.module.js.map