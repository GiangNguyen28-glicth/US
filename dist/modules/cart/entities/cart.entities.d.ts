import { Types } from 'mongoose';
import { Product } from '../../product/entities/product.entities';
import { User } from '../../user/entities/user.entities';
export declare class LineItem {
    product: Product;
    quantity: number;
    totalPrice: number;
}
export declare class Cart {
    _id: string;
    listItem: LineItem[];
    totalPrice: number | Types.Decimal128;
    user: User;
}
