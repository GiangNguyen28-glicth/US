import { User } from '../user/entities/user.entities';
import { ReviewInput } from './dto/review.input';
import { ReviewService } from './review.service';
export declare class ReviewResolver {
    private reviewService;
    constructor(reviewService: ReviewService);
    checkExistsReview(productId: string, user: User): Promise<boolean>;
    countReview(productId: string): Promise<number>;
    createReview(reviewInput: ReviewInput, user: User): Promise<boolean>;
    updateReview(input: ReviewInput, user: User): Promise<boolean>;
}
