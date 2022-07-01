import { Product } from '../../product/entities/product.entities';
export declare class LineItem {
    product: Product;
    quantity: number;
    totalPrice: number;
}
export declare class Cart {
    listItem: LineItem[];
    totalPrice: number;
}
