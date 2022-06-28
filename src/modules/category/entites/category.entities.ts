import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { CategoryEnum } from '../../../constants/enum';

@ObjectType()
export class Category {
  @Field(() => ID)
  _id: string;
  @Field(() => CategoryEnum)
  code: CategoryEnum;
  @Field({ nullable: true })
  name: string;
  @Field(() => Category, { nullable: true })
  parent: Category;
  @Field()
  level: number;
  @HideField()
  slug: string;
  @HideField()
  keyword: string;
}
