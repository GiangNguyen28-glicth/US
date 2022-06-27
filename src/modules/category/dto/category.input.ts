import { Field, InputType } from '@nestjs/graphql';
import { CategoryEnum } from '../../../constants/enum';
import { ObjectIDResolver } from 'graphql-scalars';

@InputType()
export class CategoryInput {
  @Field(() => CategoryEnum)
  code: CategoryEnum;
  @Field({ nullable: true })
  name: string;
}
@InputType()
export class CategoryGetOneInput {
  @Field(() => ObjectIDResolver)
  _id: string;
}
