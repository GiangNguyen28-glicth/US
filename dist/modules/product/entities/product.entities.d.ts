import { Types } from 'mongoose';
import { SortProductEnum } from '../../../constants/enum';
import { Category } from '../../category/entites/category.entities';
import { IProduct } from '../interfaces/product';
export declare class Product implements IProduct {
    _id: string;
    name: string;
    price: Types.Decimal128 | number;
    rating: number;
    title: string;
    discount: number;
    originalPrice: Types.Decimal128 | number;
    quantity: number;
    imgUrl: [];
    category: Category;
    displayPrice: string;
    createAt: Date;
    updateAt: Date;
    slug?: string;
    keyword: string;
}
export declare class ResultSearch implements IResultFilter<Product> {
    results: Product[];
    totalCount: number;
    minPrice?: Types.Decimal128 | number;
    maxPrice?: Types.Decimal128 | number;
    listKeyword?: string[];
}
export declare class OptionSort {
    code: SortProductEnum;
    title: string;
}
