import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entities';

@ObjectType()
export class Order {
  @Field(() => ID)
  _id: string;
  @Field(() => User)
  user: User;
  @Field()
  username: string;
  @Field()
  phonenumber: string;
  @Field()
  address: string;
  @Field(() => Number)
  totalQuantity: number;
  @Field(() => Number)
  totalPrice: number;
  @Field(() => Date)
  createAt: Date;
  @Field(() => Date)
  updateAt: Date;
}
