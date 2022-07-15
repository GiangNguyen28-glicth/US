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
exports.Cart = exports.LineItem = void 0;
const graphql_1 = require("@nestjs/graphql");
const product_entities_1 = require("../../product/entities/product.entities");
const user_entities_1 = require("../../user/entities/user.entities");
let LineItem = class LineItem {
};
__decorate([
    (0, graphql_1.Field)(() => product_entities_1.Product),
    __metadata("design:type", product_entities_1.Product)
], LineItem.prototype, "product", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], LineItem.prototype, "quantity", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], LineItem.prototype, "totalPrice", void 0);
LineItem = __decorate([
    (0, graphql_1.ObjectType)()
], LineItem);
exports.LineItem = LineItem;
let Cart = class Cart {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true }),
    __metadata("design:type", String)
], Cart.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => [LineItem]),
    __metadata("design:type", Array)
], Cart.prototype, "listItem", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Object)
], Cart.prototype, "totalPrice", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entities_1.User),
    __metadata("design:type", user_entities_1.User)
], Cart.prototype, "user", void 0);
Cart = __decorate([
    (0, graphql_1.ObjectType)()
], Cart);
exports.Cart = Cart;
//# sourceMappingURL=cart.entities.js.map