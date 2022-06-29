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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const category_entities_1 = require("./entites/category.entities");
let CategoryService = class CategoryService {
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }
    async createCategory(input) {
        const category = await this.categoryModel.findOne({ name: input.name });
        if (category) {
            throw new common_1.HttpException('Category đã tồn tại', common_1.HttpStatus.BAD_REQUEST);
        }
        const categoryDoc = await this.categoryModel.create(input);
        if (input.parentId) {
            const parent = await this.getOneCategory({ _id: input.parentId });
            categoryDoc.parent = parent;
        }
        await categoryDoc.save();
        return true;
    }
    async getOneCategory(input) {
        const { _id } = input;
        const category = await this.categoryModel.findById(_id);
        if (!category) {
            throw new common_1.HttpException('Không tìm thấy Category', common_1.HttpStatus.NOT_FOUND);
        }
        if (category.parent) {
            const parent = await this.categoryModel.findOne({
                _id: category.parent._id,
            });
            category.parent = parent;
        }
        return category;
    }
    async getChildOfCategory(categoryId) {
        const categories = await this.categoryModel
            .findOne({ _id: categoryId })
            .populate({
            path: 'child',
            populate: {
                path: 'child',
            },
        })
            .exec();
        return categories;
    }
    async getChildIdCategory(categoryId) {
        const categories = await this.getChildOfCategory(categoryId);
        let listIdDescendants = [];
        categories.child.forEach(element => {
            listIdDescendants = listIdDescendants.concat(element._id.toString());
            if (element.child.length > 0) {
                element.child.forEach(nextChild => {
                    listIdDescendants = listIdDescendants.concat(nextChild._id.toString());
                });
            }
        });
        return listIdDescendants;
    }
    async getCategoryByParentIdAndLevel(input) {
        return this.categoryModel.find(input);
    }
};
CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(category_entities_1.Category.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map