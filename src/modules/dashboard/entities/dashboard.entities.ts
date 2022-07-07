import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StatisticOrder {
  @Field(() => Int, { nullable: true })
  year?: number;
  @Field(() => Int, { nullable: true })
  month?: number;
  @Field(() => Int, { nullable: true })
  date?: number;
  @Field(() => Int)
  totalPrice: number;
}
