import { CategoryEnum } from '../../../constants/enum';
import { ICategory } from '../interfaces/category';
export declare class Category implements ICategory {
    _id: string;
    code: CategoryEnum;
    name: string;
    parent: Category | string;
    level: number;
    createAt: Date;
    updateAt: Date;
    slug: string;
    keyword: string;
    child: Category[];
}
