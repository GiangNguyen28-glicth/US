import { CategoryEnum } from '../../../constants/enum';
export declare class Category {
    _id: string;
    code: CategoryEnum;
    name: string;
    parent: Category;
    level: number;
    slug: string;
    keyword: string;
    child: Category[];
}
