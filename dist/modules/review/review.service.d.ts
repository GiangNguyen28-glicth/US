import { Model } from 'mongoose';
import { ProductService } from '../product/product.service';
import { User } from '../user/entities/user.entities';
import { ReviewInput } from './dto/review.input';
import { ProductReviewDocument } from './schemas/review.schema';
export declare class ReviewService {
    private productReviewModel;
    private productService;
    constructor(productReviewModel: Model<ProductReviewDocument>, productService: ProductService);
    createReview(input: ReviewInput, user: User): Promise<boolean>;
    countReview(productId: string): Promise<number>;
    updateReview(input: ReviewInput, user: User): Promise<boolean>;
    checkExistsReview(productId: string, userId: string): Promise<boolean>;
    averageRating(productId: string): Promise<number>;
}
