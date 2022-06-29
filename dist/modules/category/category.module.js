"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const constants_1 = require("../../constants/constants");
const enum_1 = require("../../constants/enum");
const string_utils_1 = require("../../utils/string.utils");
const category_resolver_1 = require("./category.resolver");
const category_service_1 = require("./category.service");
const category_entities_1 = require("./entites/category.entities");
const category_schema_1 = require("./schemas/category.schema");
let CategoryModule = class CategoryModule {
};
CategoryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: category_entities_1.Category.name,
                    useFactory: () => {
                        category_schema_1.CategorySchema.pre('save', function (next) {
                            if (!this.name) {
                                this.name = 'BaseSource ' + (0, string_utils_1.randomCode)(12, enum_1.RandomCodeEnum.UPPER);
                            }
                            this.slug = (0, string_utils_1.toSlug)(this.name, constants_1.Constants.LOCALE_COUNTRY_CODE_VN);
                            this.keyword = (0, string_utils_1.toKeyword)(this.slug);
                            return next();
                        });
                        return category_schema_1.CategorySchema;
                    },
                },
            ]),
        ],
        providers: [category_resolver_1.CategoryResolver, category_service_1.CategoryService],
        exports: [category_service_1.CategoryService],
    })
], CategoryModule);
exports.CategoryModule = CategoryModule;
//# sourceMappingURL=category.module.js.map