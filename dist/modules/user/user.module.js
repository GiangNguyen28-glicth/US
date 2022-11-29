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
const mongoose_1 = require("@nestjs/mongoose");
const socket_module_1 = require("../socket/socket.module");
const constants_1 = require("../../constants/constants");
const string_utils_1 = require("../../utils/string.utils");
const cloudinary_provider_1 = require("../common/cloudinary/cloudinary.provider");
const cloudinary_service_1 = require("../common/cloudinary/cloudinary.service");
const conversation_module_1 = require("../conversation/conversation.module");
const logger_module_1 = require("../logger/logger.module");
const user_embedded_module_1 = require("../user_embedded/user_embedded.module");
const user_entities_1 = require("./entities/user.entities");
const user_helper_1 = require("./helper/user.helper");
const user_schema_1 = require("./schema/user.schema");
const user_resolver_1 = require("./user.resolver");
const user_service_1 = require("./user.service");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: user_entities_1.User.name,
                    useFactory: () => {
                        user_schema_1.UserSchema.index({ showMeTinder: 1 });
                        user_schema_1.UserSchema.index({ geoLocation: '2dsphere' });
                        user_schema_1.UserSchema.pre('save', function (next) {
                            this.slug = (0, string_utils_1.toSlug)(this.username, constants_1.Constants.LOCALE_COUNTRY_CODE_VN);
                            this.keyword = (0, string_utils_1.toKeyword)(this.slug);
                            this.slug += '-' + this._id.toString();
                            if (this.birthDays) {
                                const currentDate = new Date();
                                this.age =
                                    currentDate.getFullYear() - this.birthDays.getFullYear();
                            }
                            return next();
                        });
                        return user_schema_1.UserSchema;
                    },
                },
            ]),
            user_embedded_module_1.UserEmbeddedModule,
            logger_module_1.LoggerModule,
            conversation_module_1.ConversationModule,
            (0, common_1.forwardRef)(() => socket_module_1.SocketModule),
        ],
        providers: [
            user_resolver_1.UserResolver,
            user_service_1.UserService,
            user_helper_1.UserHelper,
            cloudinary_service_1.CloudinaryService,
            cloudinary_provider_1.CloudinaryProvider,
        ],
        exports: [user_service_1.UserService],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map