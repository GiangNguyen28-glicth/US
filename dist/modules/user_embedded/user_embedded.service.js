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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEmbeddedService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const constants_1 = require("../../constants/constants");
const user_embedded_entity_1 = require("./entities/user_embedded.entity");
let UserEmbeddedService = class UserEmbeddedService {
    constructor(userEmbeddedModel) {
        this.userEmbeddedModel = userEmbeddedModel;
    }
    async getCurrentEmbedded(user_id) {
        const user_embedded = await this.userEmbeddedModel.findOne({
            user: user_id,
            count: { $lt: constants_1.Constants.MAX_COUNT_IN_USER_EMBEDDED },
        });
        return user_embedded;
    }
    async findOneAndUpdate(filter, update, options) {
        try {
            return this.userEmbeddedModel.findOneAndUpdate(filter, update, options);
        }
        catch (error) {
            throw error;
        }
    }
    async getAllIdsNotLike(user_id) {
        try {
            const user_ids = await this.userEmbeddedModel
                .find({ user: user_id })
                .distinct('unlikeUser');
            return user_ids;
        }
        catch (error) {
            throw error;
        }
    }
    async getAllIdsLiked(user_id) {
        try {
            const user_ids = await this.userEmbeddedModel
                .find({ user: user_id, countLike: { $gt: 0 } })
                .distinct('like');
            return user_ids;
        }
        catch (error) {
            throw error;
        }
    }
};
UserEmbeddedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_embedded_entity_1.UserEmbedded.name)),
    __metadata("design:paramtypes", [Object])
], UserEmbeddedService);
exports.UserEmbeddedService = UserEmbeddedService;
//# sourceMappingURL=user_embedded.service.js.map