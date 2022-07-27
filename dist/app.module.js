"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const apollo_1 = require("@nestjs/apollo");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const graphql_1 = require("@nestjs/graphql");
const mongoose_1 = require("@nestjs/mongoose");
const throttler_1 = require("@nestjs/throttler");
const auth_module_1 = require("./auth/auth.module");
const throttler_guard_1 = require("./common/guards/throttler.guard");
const graphql_config_1 = require("./configs/graphql.config");
const moongose_config_1 = require("./configs/moongose.config");
const throttler_config_1 = require("./configs/throttler.config");
const cart_module_1 = require("./modules/cart/cart.module");
const category_module_1 = require("./modules/category/category.module");
const cloudinary_module_1 = require("./modules/cloudinary/cloudinary.module");
const dashboard_module_1 = require("./modules/dashboard/dashboard.module");
const location_module_1 = require("./modules/location/location.module");
const mail_module_1 = require("./modules/mail/mail.module");
const order_item_module_1 = require("./modules/order-item/order-item.module");
const order_module_1 = require("./modules/order/order.module");
const product_module_1 = require("./modules/product/product.module");
const review_module_1 = require("./modules/review/review.module");
const user_module_1 = require("./modules/user/user.module");
const health_checker_module_1 = require("./modules/health-checker/health-checker.module");
const app_controller_1 = require("./app.controller");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            graphql_1.GraphQLModule.forRootAsync({
                driver: apollo_1.ApolloDriver,
                useClass: graphql_config_1.GraphqlService,
            }),
            mongoose_1.MongooseModule.forRootAsync({
                useClass: moongose_config_1.MoongoseConfigService,
            }),
            throttler_1.ThrottlerModule.forRootAsync({
                useClass: throttler_config_1.ThrottlerConfigService,
            }),
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
            dashboard_module_1.DashboardModule,
            health_checker_module_1.HealthCheckerModule,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_guard_1.GqlThrottlerGuard,
            },
        ],
        controllers: [app_controller_1.AppController],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map