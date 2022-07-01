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
exports.Order = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_scalars_1 = require("graphql-scalars");
let Order = class Order {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], Order.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Order.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Order.prototype, "type1", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Order.prototype, "type2", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_scalars_1.ObjectIDResolver),
    __metadata("design:type", String)
], Order.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Order.prototype, "slug", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Order.prototype, "keyword", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], Order.prototype, "createAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], Order.prototype, "updateAt", void 0);
Order = __decorate([
    (0, graphql_1.ObjectType)()
], Order);
exports.Order = Order;
//# sourceMappingURL=order.entities.js.map