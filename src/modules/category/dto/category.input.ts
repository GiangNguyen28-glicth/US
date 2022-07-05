import { Field, InputType, Int } from '@nestjs/graphql';
import { CategoryEnum } from '../../../constants/enum';
import { ObjectIDResolver } from 'graphql-scalars';

@InputType()
export class CategoryInput {
  @Field(() => CategoryEnum)
  code: CategoryEnum;
  @Field({ nullable: true })
  name: string;
  @Field(() => Int, { nullable: true })
  level: number;
  @Field(() => ObjectIDResolver, { nullable: true })
  parentId: string;
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
