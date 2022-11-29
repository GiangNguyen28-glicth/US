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
exports.TagService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mapping_tinder_1 = require("../../pattern/mapping.tinder");
const filter_query_1 = require("../../utils/filter.query");
const tag_entity_1 = require("./entities/tag.entity");
let TagService = class TagService {
    constructor(tagModel) {
        this.tagModel = tagModel;
    }
    async create(input) {
        const tag = await this.tagModel.create(input);
        return tag ? true : false;
    }
    async findAll(pagination, filter) {
        const [queryFilter, querySort] = new filter_query_1.FilterBuilder()
            .setFilterItem('type', {
            $eq: filter === null || filter === void 0 ? void 0 : filter.type,
        }, filter === null || filter === void 0 ? void 0 : filter.type)
            .setFilterItem('_id', { $in: filter === null || filter === void 0 ? void 0 : filter.ids }, filter === null || filter === void 0 ? void 0 : filter.ids)
            .setFilterItem('parentType', { $eq: filter === null || filter === void 0 ? void 0 : filter.parentType }, filter === null || filter === void 0 ? void 0 : filter.parentType)
            .setSortItem('createdAt', 1)
            .buildQuery();
        const [results, totalCount] = await Promise.all([
            this.tagModel
                .find(queryFilter)
                .skip(((pagination === null || pagination === void 0 ? void 0 : pagination.page) - 1) * (pagination === null || pagination === void 0 ? void 0 : pagination.size))
                .limit(pagination === null || pagination === void 0 ? void 0 : pagination.size)
                .sort(querySort),
            this.tagModel.countDocuments(queryFilter),
        ]);
        return { results, totalCount };
    }
    findOne(id) {
        return `This action returns a #${id} tag`;
    }
    async createTagPassion() {
        const tags = (0, mapping_tinder_1.mappingDataPassion)();
        await this.tagModel.insertMany(tags);
        return true;
    }
    async createTagZodiac() {
        const tags = (0, mapping_tinder_1.mappingDataZodiac)();
        await this.tagModel.insertMany(tags);
        return true;
    }
    async createTagPersonality() {
        const tags = (0, mapping_tinder_1.mappingDataPersonalityType)();
        await this.tagModel.insertMany(tags);
        return true;
    }
    async createTagDiet() {
        const tags = (0, mapping_tinder_1.mappingDataDietaryPreference)();
        await this.tagModel.insertMany(tags);
        return true;
    }
    async createTagPet() {
        const tags = (0, mapping_tinder_1.mappingDataPets)();
        await this.tagModel.insertMany(tags);
        return true;
    }
    async createTagEducation() {
        const tags = (0, mapping_tinder_1.mappingDataEducation)();
        await this.tagModel.insertMany(tags);
        return true;
    }
    async createTagSmokeQuestion() {
        const tags = (0, mapping_tinder_1.mappingDataEducation)();
        await this.tagModel.insertMany(tags);
        return true;
    }
    async deleteMany() {
        await this.tagModel.deleteMany({ parentType: 'Life style' });
        return true;
    }
};
TagService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(tag_entity_1.Tag.name)),
    __metadata("design:paramtypes", [Object])
], TagService);
exports.TagService = TagService;
//# sourceMappingURL=tag.service.js.map