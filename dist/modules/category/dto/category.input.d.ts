import { CategoryEnum } from '../../../constants/enum';
export declare class CategoryInput {
    code: CategoryEnum;
    name: string;
    level: number;
    parentId: string;
}
export declare class CategoryGetOneInput {
    _id: string;
}
export declare class CategoryGetByParentAndLevel {
    parent?: string;
    level?: number;
    categoryId?: string;
}
