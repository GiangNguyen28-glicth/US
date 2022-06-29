import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Product } from '../../product/entities/product.entities';
import { User } from '../../user/entities/user.entities';

@ObjectType()
export class ProductReview {
  @Field(() => ID)
  _id: string;
  @Field(() => Product)
  product: Product;
  @Field(() => User)
  user: User;
  @Field(() => Int)
  rating: number;
  @Field(() => Date)
  createAt: Date;
  @Field(() => Date)
  updateAt: Date;
}
