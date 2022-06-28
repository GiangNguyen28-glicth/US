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
