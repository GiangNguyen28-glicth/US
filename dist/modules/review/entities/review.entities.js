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
exports.ProductReview = void 0;
const graphql_1 = require("@nestjs/graphql");
const product_entities_1 = require("../../product/entities/product.entities");
const user_entities_1 = require("../../user/entities/user.entities");
let ProductReview = class ProductReview {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], ProductReview.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => product_entities_1.Product),
    __metadata("design:type", product_entities_1.Product)
], ProductReview.prototype, "product", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entities_1.User),
    __metadata("design:type", user_entities_1.User)
], ProductReview.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ProductReview.prototype, "rating", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], ProductReview.prototype, "createAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], ProductReview.prototype, "updateAt", void 0);
ProductReview = __decorate([
    (0, graphql_1.ObjectType)()
], ProductReview);
exports.ProductReview = ProductReview;
//# sourceMappingURL=review.entities.js.map