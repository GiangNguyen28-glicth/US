import { SortProductEnum } from 'constants/enum';
import { ICreateProduct, IProduct } from '../interfaces/product';
export declare class CreateProductInput implements ICreateProduct<IProduct> {
    name: string;
    price: number;
    title: string;
    discount: number;
    quantity: number;
    imgUrl: string[];
    category: string;
}
export declare class UpdateProduct implements Partial<IProduct> {
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
    categoryId: string;
}
export declare class SearchProductInput extends BasePagenation {
    sort: SortProductEnum;
    filter: FilterProduct;
}
export declare class OptionFilterProduct extends BasePagenation {
}
