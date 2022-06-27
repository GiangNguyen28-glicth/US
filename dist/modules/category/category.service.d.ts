import { Model } from 'mongoose';
import { CategoryGetOneInput, CategoryInput } from './dto/category.input';
import { Category } from './entites/category.entities';
export declare class CategoryService {
    private categoryModel;
    constructor(categoryModel: Model<Category>);
    createCategory(input: CategoryInput): Promise<boolean>;
    getOneCategory(input: CategoryGetOneInput): Promise<Category>;
}
