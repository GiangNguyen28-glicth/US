import { SortProductEnum } from 'constants/enum';
import { IProductCreate } from '../interfaces/product';
export declare class CreateProductInput implements IProductCreate {
    name: string;
    price: number;
    title: string;
    discount: number;
    quantity: number;
    imgUrl: string[];
    category: string;
}
export declare class UpdateProduct {
    name?: string;
    price?: number;
    rating?: number;
    quantity?: number;
}
export declare class SortProductInput {
    filterby: SortProductEnum;
}
export declare class BasePagenation {
    page?: number;
    size?: number;
}
export declare class FilterProduct {
    minPrice: number;
    maxPrice: number;
    name?: string;
    isDiscount?: boolean;
    productId: string;
}
export declare class SearchProductInput extends BasePagenation {
    name?: string;
}
export declare class OptionFilterProduct extends BasePagenation {
    filter: FilterProduct;
    sort: SortProductEnum;
}
