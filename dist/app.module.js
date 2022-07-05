"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const cache_config_1 = require("./configs/cache.config");
const graphql_config_1 = require("./configs/graphql.config");
const moongose_config_1 = require("./configs/moongose.config");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./modules/user/user.module");
const cart_module_1 = require("./modules/cart/cart.module");
const location_module_1 = require("./modules/location/location.module");
const category_module_1 = require("./modules/category/category.module");
const mail_module_1 = require("./modules/mail/mail.module");
const order_module_1 = require("./modules/order/order.module");
const product_module_1 = require("./modules/product/product.module");
const throttler_config_1 = require("./configs/throttler.config");
const core_1 = require("@nestjs/core");
const throttler_guard_1 = require("./common/guards/throttler.guard");
const cloudinary_module_1 = require("./modules/cloudinary/cloudinary.module");
const review_module_1 = require("./modules/review/review.module");
const order_item_module_1 = require("./modules/order-item/order-item.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            graphql_config_1.graphqlConfig,
            moongose_config_1.moongoseConfig,
            throttler_config_1.throttlerConfig,
            cache_config_1.cacheConfig,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            cart_module_1.CartModule,
            location_module_1.LocationModule,
            category_module_1.CategoryModule,
            mail_module_1.MailModule,
            order_module_1.OrderModule,
            product_module_1.ProductModule,
            cloudinary_module_1.CloudinaryModule,
            review_module_1.ReviewModule,
            order_module_1.OrderModule,
            order_item_module_1.OrderItemModule,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_guard_1.GqlThrottlerGuard,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map