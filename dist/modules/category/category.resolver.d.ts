import { CategoryService } from './category.service';
import { CategoryGetByParentAndLevel, CategoryGetOneInput, CategoryInput } from './dto/category.input';
import { Category } from './entites/category.entities';
export declare class CategoryResolver {
    private categoryService;
    constructor(categoryService: CategoryService);
    getChildOfCategory(categoryId: string): Promise<Category>;
    getChildIdCategory(categoryId: string): Promise<string[]>;
    getCategoryByParentIdAndLevel(input: CategoryGetByParentAndLevel): Promise<Category[]>;
    getCategoryById(input: CategoryGetOneInput): Promise<Category>;
    createCategory(input: CategoryInput): Promise<boolean>;
}
