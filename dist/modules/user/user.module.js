"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_resolver_1 = require("./user.resolver");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./schema/user.schema");
const user_entities_1 = require("./entities/user.entities");
const string_utils_1 = require("../../utils/string.utils");
const enum_1 = require("../../constants/enum");
const constants_1 = require("../../constants/constants");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: user_entities_1.User.name,
                    useFactory: () => {
                        user_schema_1.UserSchema.pre('save', function (next) {
                            if (!this.username) {
                                this.username =
                                    'BaseSource ' + (0, string_utils_1.randomCode)(12, enum_1.RandomCodeEnum.UPPER);
                            }
                            this.slug = (0, string_utils_1.toSlug)(this.username, constants_1.Constants.LOCALE_COUNTRY_CODE_VN);
                            this.keyword = (0, string_utils_1.toKeyword)(this.slug);
                            return next();
                        });
                        return user_schema_1.UserSchema;
                    },
                },
            ]),
        ],
        providers: [user_service_1.UserService, user_resolver_1.UserResolver],
        exports: [user_service_1.UserService],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map