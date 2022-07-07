import { Field, InputType } from '@nestjs/graphql';
import { FilterStatistics } from '../../../constants/enum';

@InputType()
export class FilterStatisticInput {
  @Field(() => FilterStatistics)
  filterby: FilterStatistics;
}
