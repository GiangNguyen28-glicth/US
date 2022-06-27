import { CategoryService } from './category.service';
import { CategoryGetOneInput, CategoryInput } from './dto/category.input';
import { Category } from './entites/category.entities';
export declare class CategoryResolver {
    private categoryService;
    constructor(categoryService: CategoryService);
    getCategoryById(input: CategoryGetOneInput): Promise<Category>;
    createCategory(input: CategoryInput): Promise<boolean>;
}
