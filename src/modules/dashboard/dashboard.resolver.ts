import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { hasRoles } from '../../common/decorators/role.decorator';
import { AtGuard } from '../../common/guards/at.guard';
import { RolesGuard } from '../../common/guards/role.guard';
import { FilterStatistics, RoleEnum } from '../../constants/enum';
import { User } from '../user/entities/user.entities';
import { DashboardService } from './dashboard.service';
import { StatisticOrder } from './entities/dashboard.entities';

@Resolver('Dashboard')
export class DashboardResolver {
  constructor(private dashboadService: DashboardService) {}
  @Query(() => [User])
  statistic(
    @Args('input', { type: () => FilterStatistics }) input: string,
  ): Promise<User[]> {
    return this.dashboadService.statistic(input);
  }

  @Query(() => [StatisticOrder])
  @hasRoles(RoleEnum.ADMIN)
  @UseGuards(AtGuard, RolesGuard)
  statisticOrder(
    @Args('input', { type: () => FilterStatistics }) input: string,
  ): Promise<StatisticOrder[]> {
    return this.dashboadService.statisticOrder(input);
  }
}
