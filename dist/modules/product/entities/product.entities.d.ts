import { Schema } from 'mongoose';
export declare class Product {
    _id: string;
    name?: string;
    price?: Schema.Types.Decimal128;
    rating?: number;
    title?: string;
    discount: number;
    quantity: number;
    imgUrl: [];
    categoryId: string;
    createAt: Date;
    updateAt: Date;
    slug: string;
    keyword: string;
}
