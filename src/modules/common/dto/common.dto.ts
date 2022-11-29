import { Field, InputType } from '@nestjs/graphql';
import { IPagination } from '../interfaces/common';

@InputType()
export class PaginationInput implements IPagination {
  @Field(() => Number, { nullable: true, defaultValue: 0 })
  page: number;

  @Field(() => Number, { nullable: true, defaultValue: 100 })
  size: number;
}
