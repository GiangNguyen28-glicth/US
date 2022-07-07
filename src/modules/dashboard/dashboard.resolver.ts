import { Args, Query, Resolver } from '@nestjs/graphql';
import { FilterStatistics } from '../../constants/enum';
import { User } from '../user/entities/user.entities';
import { DashboardService } from './dashboard.service';
import { StatisticOrder } from './entities/dashboard.entities';

@Resolver('Dashboard')
export class DashboardResolver {
  constructor(private dashboadService: DashboardService) {}
  @Query(() => [User])
  async statistic(
    @Args('input', { type: () => FilterStatistics }) input: string,
  ): Promise<User[]> {
    return this.dashboadService.statistic(input);
  }

  @Query(() => [StatisticOrder])
  async statisticOrder(
    @Args('input', { type: () => FilterStatistics }) input: string,
  ): Promise<StatisticOrder[]> {
    return this.dashboadService.statisticOrder(input);
  }
}
