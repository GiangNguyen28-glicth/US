"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEmbeddedModule = void 0;
const common_1 = require("@nestjs/common");
const user_embedded_service_1 = require("./user_embedded.service");
const mongoose_1 = require("@nestjs/mongoose");
const user_embedded_entity_1 = require("./entities/user_embedded.entity");
const user_embedded_schema_1 = require("./schema/user_embedded.schema");
let UserEmbeddedModule = class UserEmbeddedModule {
};
UserEmbeddedModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: user_embedded_entity_1.UserEmbedded.name,
                    schema: user_embedded_schema_1.UserEmbeddedSchema,
                },
            ]),
        ],
        providers: [user_embedded_service_1.UserEmbeddedService],
        exports: [user_embedded_service_1.UserEmbeddedService],
    })
], UserEmbeddedModule);
exports.UserEmbeddedModule = UserEmbeddedModule;
//# sourceMappingURL=user_embedded.module.js.map