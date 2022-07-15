import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { CategoryEnum } from '../../../constants/enum';
import { ICategory } from '../interfaces/category';

@ObjectType()
export class Category implements ICategory {
  @Field(() => ID)
  _id: string;
  @Field(() => CategoryEnum)
  code: CategoryEnum;
  @Field({ nullable: true })
  name: string;
  @Field(() => Category, { nullable: true })
  parent: Category | string;
  @Field()
  level: number;
  @Field({ nullable: true })
  createAt: Date;
  @Field({ nullable: true })
  updateAt: Date;
  @Field()
  slug: string;
  @HideField()
  keyword: string;
  @Field(() => [Category], { nullable: true })
  child: Category[];
}
