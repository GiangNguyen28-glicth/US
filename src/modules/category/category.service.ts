import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { setInputForOldDocument } from '../../utils/feature.utils';
import { CategoryGetOneInput, CategoryInput } from './dto/category.input';
import { Category } from './entites/category.entities';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}
  async createCategory(input: CategoryInput): Promise<boolean> {
    const category = await this.categoryModel.findOne({ name: input.name });
    if (category) {
      throw new HttpException('Category đã tồn tại', HttpStatus.BAD_REQUEST);
    }
    const categoryDoc = await this.categoryModel.create(input);
    if (input.parentId) {
      const parent = await this.getOneCategory({ _id: input.parentId });
      categoryDoc.parent = parent;
    }
    await categoryDoc.save();
    return true;
  }
  async getOneCategory(input: CategoryGetOneInput): Promise<Category> {
    const { _id } = input;
    const category = await this.categoryModel.findById(_id);
    if (!category) {
      throw new HttpException('Không tìm thấy Category', HttpStatus.NOT_FOUND);
    }
    if (category.parent) {
      const parent = await this.categoryModel.findOne({
        _id: category.parent._id,
      });
      category.parent = parent;
    }
    return category;
  }
}
