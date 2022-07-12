import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Constants } from '../../constants/constants';
import {
  CategoryGetByParentAndLevel,
  CategoryGetOneInput,
  CategoryInput,
} from './dto/category.input';
import { Category } from './entites/category.entities';
import { CategoryDocument } from './schemas/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}
  async createCategory(input: CategoryInput): Promise<boolean> {
    try {
      const category = await this.categoryModel.findOne({ name: input.name });
      if (category) {
        throw new HttpException('Category đã tồn tại', HttpStatus.BAD_REQUEST);
      }
      const categoryDoc = await this.categoryModel.create(input);
      if (input.parentId) {
        const parent = await this.getOneCategory({ _id: input.parentId });
        categoryDoc.parent = parent;
      }
      return categoryDoc.save() ? true : false;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async getOneCategory(input: CategoryGetOneInput): Promise<Category> {
    try {
      const { _id } = input;
      const category = await this.categoryModel.findById(_id);
      if (!category) {
        throw new HttpException(
          'Không tìm thấy Category',
          HttpStatus.NOT_FOUND,
        );
      }
      if (category.parent) {
        const parent = await this.categoryModel.findOne({
          _id: category.parent._id,
        });
        category.parent = parent;
      }
      return category;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async getChildOfCategory(categoryId: string): Promise<Category> {
    const categories: CategoryDocument = await this.categoryModel
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
  async getChildIdCategory(categoryId: string): Promise<string[]> {
    const categories = await this.getChildOfCategory(categoryId);
    let listIdDescendants: string[] = [];
    categories.child.forEach(element => {
      listIdDescendants = listIdDescendants.concat(element._id.toString());
      if (element.child.length > 0) {
        element.child.forEach(nextChild => {
          listIdDescendants = listIdDescendants.concat(
            nextChild._id.toString(),
          );
        });
      }
    });
    return listIdDescendants;
  }
  async getCategoryByParentIdAndLevel(
    input: CategoryGetByParentAndLevel,
  ): Promise<Category[]> {
    return this.categoryModel
      .find(input)
      .populate({
        path: 'child',
        populate: {
          path: 'child',
        },
      })
      .exec();
  }
}
