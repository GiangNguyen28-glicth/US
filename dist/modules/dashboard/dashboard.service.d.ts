import { OrderService } from '../order/order.service';
import { User } from '../user/entities/user.entities';
import { UserService } from '../user/user.service';
import { StatisticOrder } from './entities/dashboard.entities';
export declare class DashboardService {
    private orderService;
    private userService;
    constructor(orderService: OrderService, userService: UserService);
    statistic(filterStatistic: string): Promise<User[]>;
    statisticOrder(filterStatistic: string): Promise<StatisticOrder[]>;
    initDataByFilter(option: string, listStatisticOrder: StatisticOrder[], startOfDate: Date, endOfDate: Date): StatisticOrder[];
    initDefaultDataMonth(listStatisticOrder: StatisticOrder[], monthStart: number, monthEnd: number): StatisticOrder[];
    initDefaultDataDate(listStatisticOrder: StatisticOrder[], startOfDate: Date, endOfDate: Date): StatisticOrder[];
    isContainsMonth(listStatisticOrder: StatisticOrder[], month: number): boolean;
    isContainsDateOfMonth(listStatisticOrder: StatisticOrder[], date: number, month: number): boolean;
}
