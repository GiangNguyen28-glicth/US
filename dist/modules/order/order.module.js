"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModule = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const order_resolver_1 = require("./order.resolver");
const mongoose_1 = require("@nestjs/mongoose");
const order_entities_1 = require("./entities/order.entities");
const order_schema_1 = require("./schemas/order.schema");
let OrderModule = class OrderModule {
};
OrderModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: order_entities_1.Order.name,
                    useFactory: () => {
                        order_schema_1.OrderSchema.pre('save', function (next) {
                            return next();
                        });
                        return order_schema_1.OrderSchema;
                    },
                },
            ]),
        ],
        providers: [order_service_1.OrderService, order_resolver_1.OrderResolver],
    })
], OrderModule);
exports.OrderModule = OrderModule;
//# sourceMappingURL=order.module.js.map