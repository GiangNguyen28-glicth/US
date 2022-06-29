import { Product } from '../../product/entities/product.entities';
import { User } from '../../user/entities/user.entities';
export declare class ProductReview {
    _id: string;
    product: Product;
    user: User;
    rating: number;
    createAt: Date;
    updateAt: Date;
}
