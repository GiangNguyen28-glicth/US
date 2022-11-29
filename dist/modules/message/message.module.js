"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModule = void 0;
const common_1 = require("@nestjs/common");
const message_service_1 = require("./message.service");
const message_resolver_1 = require("./message.resolver");
const mongoose_1 = require("@nestjs/mongoose");
const message_entity_1 = require("./entities/message.entity");
const message_schema_1 = require("./schema/message.schema");
const string_utils_1 = require("../../utils/string.utils");
const conversation_module_1 = require("../conversation/conversation.module");
let MessageModule = class MessageModule {
};
MessageModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: message_entity_1.Message.name,
                    useFactory: () => {
                        message_schema_1.MessageSchema.index({ cursor: 1 });
                        message_schema_1.MessageSchema.pre('save', function (next) {
                            this.keyword = (0, string_utils_1.toKeyword)((0, string_utils_1.toSlug)(this.text));
                            return next();
                        });
                        return message_schema_1.MessageSchema;
                    },
                },
            ]),
            conversation_module_1.ConversationModule,
        ],
        providers: [message_resolver_1.MessageResolver, message_service_1.MessageService],
        exports: [message_service_1.MessageService],
    })
], MessageModule);
exports.MessageModule = MessageModule;
//# sourceMappingURL=message.module.js.map