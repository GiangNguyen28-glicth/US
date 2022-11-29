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
exports.ConversationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const constants_1 = require("../../constants/constants");
const filter_query_1 = require("../../utils/filter.query");
const model_utils_1 = require("../../utils/model.utils");
const logger_service_1 = require("../logger/logger.service");
const conversation_entity_1 = require("./entities/conversation.entity");
let ConversationService = class ConversationService {
    constructor(conversionModel, loggerService) {
        this.conversionModel = conversionModel;
        this.loggerService = loggerService;
    }
    async create(input) {
        try {
            const conversation = await this.conversionModel.create(input);
            return conversation ? true : false;
        }
        catch (error) {
            throw error;
        }
    }
    async findAll(input, user) {
        const [queryFilter, querySort] = new filter_query_1.FilterBuilder()
            .setFilterItem('members', {
            $elemMatch: { $eq: user._id },
        }, user._id)
            .setSortItem('updatedAt', -1)
            .buildQuery();
        const [results, totalCount] = await Promise.all([
            this.conversionModel
                .find(queryFilter)
                .skip(input === null || input === void 0 ? void 0 : input.size)
                .limit(((input === null || input === void 0 ? void 0 : input.page) - 1) * (input === null || input === void 0 ? void 0 : input.size))
                .sort(querySort),
            this.conversionModel.count(queryFilter),
        ]);
        this.loggerService.debug(`Conversation result :${results.length}`);
        return { results, totalCount };
    }
    async getAllUserMatched(input, user, isMessaged) {
        let subQuery = null;
        if (isMessaged === true) {
            subQuery = { $ne: null };
        }
        else if (isMessaged === false) {
            subQuery = { $eq: null };
        }
        const [queryFilter, querySort] = new filter_query_1.FilterBuilder()
            .setFilterItem('members', {
            $elemMatch: { $eq: user._id },
        }, user._id)
            .setFilterItem('lastMessage', subQuery, subQuery)
            .setSortItem('updatedAt', -1)
            .buildQuery();
        let [results, totalCount] = await Promise.all([
            this.conversionModel
                .find(queryFilter)
                .skip(input === null || input === void 0 ? void 0 : input.size)
                .limit(((input === null || input === void 0 ? void 0 : input.page) - 1) * (input === null || input === void 0 ? void 0 : input.size))
                .sort(querySort)
                .populate('members', constants_1.Constants.EXCLUDE_FIELDS),
            this.conversionModel.count(queryFilter),
        ]);
        results = this.filterByLastMessaged(results, user._id.toString());
        this.loggerService.debug(`Conversation result :${results.length}`);
        return { results, totalCount };
    }
    filterByLastMessaged(conversations, user_id) {
        return conversations.filter(item => {
            item.user =
                item.members[0]._id.toString() === user_id
                    ? item.members[1]
                    : item.members[0];
            return item;
        });
    }
    async findOne(input) {
        try {
            let queryFilter = {};
            if (input === null || input === void 0 ? void 0 : input.members) {
                const reverseMembers = input === null || input === void 0 ? void 0 : input.members.reverse();
                queryFilter = {
                    $or: [{ members: input.members }, { members: reverseMembers }],
                };
            }
            if (input === null || input === void 0 ? void 0 : input._id) {
                queryFilter['_id'] = input === null || input === void 0 ? void 0 : input._id;
            }
            const conversation = await this.conversionModel.findOne(queryFilter);
            (0, model_utils_1.throwIfNotExists)(conversation, 'Conversation not found');
            return conversation;
        }
        catch (error) {
            throw error;
        }
    }
    async findOneAndUpdate(filter, update, options) {
        try {
            const conversation = await this.conversionModel.findOneAndUpdate(filter, update, options);
            return conversation;
        }
        catch (error) {
            throw error;
        }
    }
    async updateModel(conversation) {
        const conversationUpdate = new this.conversionModel(conversation);
        return await conversationUpdate.save();
    }
    getQueryOrMembers(members) {
        const reverseMembers = members.reverse();
        const query = {
            $or: [{ members: members }, { members: reverseMembers }],
        };
        return query;
    }
};
ConversationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(conversation_entity_1.Conversation.name)),
    __metadata("design:paramtypes", [Object, logger_service_1.LoggerService])
], ConversationService);
exports.ConversationService = ConversationService;
//# sourceMappingURL=conversation.service.js.map