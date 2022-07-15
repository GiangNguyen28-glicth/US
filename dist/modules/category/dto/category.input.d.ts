import { CategoryEnum } from '../../../constants/enum';
import { ICategory, ICategoryCreate } from '../interfaces/category';
import { Category } from '../entites/category.entities';
export declare class CategoryInput implements ICategoryCreate<ICategory> {
    code: CategoryEnum;
    name: string;
    level: number;
    parent: Category | string;
}
export declare class CategoryGetOneInput {
    _id: string;
}
export declare class CategoryGetByParentAndLevel {
    parent?: string;
    level?: number;
    categoryId?: string;
}
