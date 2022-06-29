"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const constants_1 = require("../../constants/constants");
const enum_1 = require("../../constants/enum");
const feature_utils_1 = require("../../utils/feature.utils");
const string_utils_1 = require("../../utils/string.utils");
const category_module_1 = require("../category/category.module");
const product_entities_1 = require("./entities/product.entities");
const product_resolver_1 = require("./product.resolver");
const product_service_1 = require("./product.service");
const product_schema_1 = require("./schemas/product.schema");
let ProductModule = class ProductModule {
};
ProductModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: product_entities_1.Product.name,
                    useFactory: () => {
                        product_schema_1.ProductSchema.index({ name: 1 });
                        product_schema_1.ProductSchema.pre('save', function (next) {
                            if (!this.name) {
                                this.name = 'BaseSource ' + (0, string_utils_1.randomCode)(12, enum_1.RandomCodeEnum.UPPER);
                            }
                            this.displayPrice = (0, feature_utils_1.toformatPrice)(this.price);
                            this.slug = (0, string_utils_1.toSlug)(this.name, constants_1.Constants.LOCALE_COUNTRY_CODE_VN);
                            this.keyword = (0, string_utils_1.toKeyword)(this.slug);
                            return next();
                        });
                        return product_schema_1.ProductSchema;
                    },
                },
            ]),
            category_module_1.CategoryModule,
        ],
        providers: [product_resolver_1.ProductResolver, product_service_1.ProductService],
        exports: [product_service_1.ProductService],
    })
], ProductModule);
exports.ProductModule = ProductModule;
//# sourceMappingURL=product.module.js.map