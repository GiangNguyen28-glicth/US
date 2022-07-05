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
exports.OrderItem = void 0;
const graphql_1 = require("@nestjs/graphql");
const order_entities_1 = require("../../order/entities/order.entities");
const product_entities_1 = require("../../product/entities/product.entities");
let OrderItem = class OrderItem {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], OrderItem.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => product_entities_1.Product),
    __metadata("design:type", product_entities_1.Product)
], OrderItem.prototype, "product", void 0);
__decorate([
    (0, graphql_1.Field)(() => order_entities_1.Order),
    __metadata("design:type", order_entities_1.Order)
], OrderItem.prototype, "order", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], OrderItem.prototype, "quantity", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], OrderItem.prototype, "totalPrice", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], OrderItem.prototype, "createAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], OrderItem.prototype, "updateAt", void 0);
OrderItem = __decorate([
    (0, graphql_1.ObjectType)()
], OrderItem);
exports.OrderItem = OrderItem;
//# sourceMappingURL=orderitem.entities.js.map