import { User } from '../user/entities/user.entities';
import { DashboardService } from './dashboard.service';
import { StatisticOrder } from './entities/dashboard.entities';
export declare class DashboardResolver {
    private dashboadService;
    constructor(dashboadService: DashboardService);
    statistic(input: string): Promise<User[]>;
    statisticOrder(input: string): Promise<StatisticOrder[]>;
}
