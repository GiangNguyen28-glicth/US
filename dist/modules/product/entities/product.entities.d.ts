import { Schema } from 'mongoose';
import { Category } from '../../category/entites/category.entities';
export declare class Product {
    _id: string;
    name?: string;
    price?: Schema.Types.Decimal128;
    rating?: number;
    title?: string;
    discount: number;
    quantity: number;
    imgUrl: [];
    category: Category;
    displayPrice: string;
    createAt: Date;
    updateAt: Date;
    slug: string;
    keyword: string;
}
