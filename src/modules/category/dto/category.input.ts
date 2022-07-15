import { Field, InputType, Int } from '@nestjs/graphql';
import { CategoryEnum } from '../../../constants/enum';
import { ObjectIDResolver } from 'graphql-scalars';
import { ICategory, ICategoryCreate } from '../interfaces/category';
import { Category } from '../entites/category.entities';
import { Max, Min } from 'class-validator';

@InputType()
export class CategoryInput implements ICategoryCreate<ICategory> {
  @Field(() => CategoryEnum)
  code: CategoryEnum;
  @Field()
  name: string;
  @Field(() => Int)
  @Min(1, { message: 'Level tối thiểu là 1' })
  @Max(3, { message: 'Level tối đa là 3' })
  level: number;
  @Field(() => ObjectIDResolver, { nullable: true })
  parent: Category | string;
}
@InputType()
export class CategoryGetOneInput {
  @Field(() => ObjectIDResolver)
  _id: string;
}
@InputType()
export class CategoryGetByParentAndLevel {
  @Field(() => ObjectIDResolver, { nullable: true })
  parent?: string;
  @Field(() => Int, { nullable: true })
  level?: number;
  @Field(() => ObjectIDResolver, { nullable: true })
  categoryId?: string;
}
