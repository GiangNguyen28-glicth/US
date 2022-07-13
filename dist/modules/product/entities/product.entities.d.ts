import { Types } from 'mongoose';
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
export declare class ResultFilter implements IResultFilter<Product> {
    results: Product[];
    listKeyword?: string[];
    totalCount: number;
}
