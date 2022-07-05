import { FilterProduct } from '../../../constants/enum';
export declare class CreateProductInput {
    name?: string;
    price: number;
    title: string;
    discount?: number;
    quantity: number;
    imgUrl?: [];
    category: string;
}
export declare class SearchProductInput {
    category?: string;
    name?: string;
    price: number;
}
export declare class UpdateProduct {
    name?: string;
    price?: number;
    rating?: number;
    quantity?: number;
}
export declare class FilterProductInput {
    filterby: FilterProduct;
}
