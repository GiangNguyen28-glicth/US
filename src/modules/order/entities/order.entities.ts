import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ObjectIDResolver } from 'graphql-scalars';

@ObjectType()
export class Order {
  @Field(() => ID)
  _id: string;
  @Field()
  name: string;
  @Field()
  type1: string;
  @Field()
  type2: string;
  @Field(() => ObjectIDResolver)
  id: string;
  @Field()
  slug: string;
  @Field()
  keyword: string;
  @Field(() => Date)
  createAt: Date;
  @Field(() => Date)
  updateAt: Date;
}
