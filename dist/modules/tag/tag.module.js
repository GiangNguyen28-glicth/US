"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagModule = void 0;
const common_1 = require("@nestjs/common");
const tag_service_1 = require("./tag.service");
const tag_resolver_1 = require("./tag.resolver");
const mongoose_1 = require("@nestjs/mongoose");
const tag_entity_1 = require("./entities/tag.entity");
const tag_schema_1 = require("./schema/tag.schema");
let TagModule = class TagModule {
};
TagModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: tag_entity_1.Tag.name,
                    useFactory: () => {
                        tag_schema_1.TagSchema.pre('save', function (next) {
                            return next();
                        });
                        return tag_schema_1.TagSchema;
                    },
                },
            ]),
        ],
        providers: [tag_resolver_1.TagResolver, tag_service_1.TagService],
    })
], TagModule);
exports.TagModule = TagModule;
//# sourceMappingURL=tag.module.js.map