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
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const constants_1 = require("../../constants/constants");
const filter_query_1 = require("../../utils/filter.query");
const model_utils_1 = require("../../utils/model.utils");
const conversation_service_1 = require("../conversation/conversation.service");
const message_entity_1 = require("./entities/message.entity");
let MessageService = class MessageService {
    constructor(messageModel, conversationService) {
        this.messageModel = messageModel;
        this.conversationService = conversationService;
    }
    async create(input) {
        var _a;
        try {
            const [conversation, message] = await Promise.all([
                this.conversationService.findOne({ _id: input.conversion_id }),
                this.messageModel.create(input),
            ]);
            message.cursor = ((_a = conversation.lastMessage) === null || _a === void 0 ? void 0 : _a.cursor) + 1 || 1;
            conversation.lastMessage = message;
            await Promise.all([
                this.conversationService.updateModel(conversation),
                message.save(),
            ]);
            return message;
        }
        catch (error) {
            throw error;
        }
    }
    async findAll(filter, pagination) {
        try {
            const [queryFilter, querySort] = new filter_query_1.FilterBuilder()
                .setFilterItem('conversion_id', { $eq: filter === null || filter === void 0 ? void 0 : filter.conversion_id }, filter === null || filter === void 0 ? void 0 : filter.conversion_id)
                .setFilterItem('type', { $eq: filter === null || filter === void 0 ? void 0 : filter.type }, filter === null || filter === void 0 ? void 0 : filter.type)
                .setFilterItem('cursor', { $gte: pagination === null || pagination === void 0 ? void 0 : pagination.cursor }, pagination === null || pagination === void 0 ? void 0 : pagination.cursor)
                .setSortItem('cursor', 1)
                .buildQuery();
            const [results, totalCount] = await Promise.all([
                this.messageModel.find(queryFilter).limit(pagination === null || pagination === void 0 ? void 0 : pagination.limit),
                this.messageModel.countDocuments(queryFilter),
            ]);
            return { results, totalCount };
        }
        catch (error) {
            throw error;
        }
    }
    async remove(_id) {
        try {
            const message = await this.messageModel.findOneAndUpdate({ _id }, { $set: { isDeleted: true, text: constants_1.Constants.MESSAGE_HAS_DELETED } }, { new: true });
            (0, model_utils_1.throwIfNotExists)(message, 'Message not found');
            return message ? true : false;
        }
        catch (error) {
            throw error;
        }
    }
};
MessageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(message_entity_1.Message.name)),
    __metadata("design:paramtypes", [Object, conversation_service_1.ConversationService])
], MessageService);
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map