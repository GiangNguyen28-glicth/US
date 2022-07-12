import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { FilterStatistics } from '../../constants/enum';
import {
  setLastDate,
  setStartDate,
  statisticFormatDateToString,
} from '../../utils/feature.utils';
import { OrderService } from '../order/order.service';
import { User } from '../user/entities/user.entities';
import { UserService } from '../user/user.service';
import { StatisticOrder } from './entities/dashboard.entities';
import { Cache } from 'cache-manager';
import { checkCacheStore } from '../../utils/redis.utils';
@Injectable()
export class DashboardService {
  constructor(
    private orderService: OrderService,
    private userService: UserService,
  ) {}
  async statistic(filterStatistic: string): Promise<User[]> {
    const [startOfDate, endOfDate]: [string, string] =
      statisticFormatDateToString(filterStatistic);
    const users = await this.userService.getUserByDate(startOfDate, endOfDate);
    return users;
  }
  async statisticOrder(filterStatistic: string): Promise<StatisticOrder[]> {
    let listStatisticOrder: StatisticOrder[] = [];
    // listStatisticOrder = await this.getStatisticOrderInCache(filterStatistic);
    // if (listStatisticOrder.length > 0) {
    //   console.log('Get Cache');
    //   return listStatisticOrder;
    // }
    const [startOfDate, endOfDate]: [string, string] =
      statisticFormatDateToString(filterStatistic);
    let endOfDateConvert: Date = new Date(endOfDate);
    endOfDateConvert = setLastDate(endOfDateConvert);
    let startOfDateConvert: Date = new Date(startOfDate);
    startOfDateConvert = setStartDate(startOfDateConvert);
    const orders = await this.orderService.statisticOrder(
      startOfDateConvert,
      endOfDateConvert,
      filterStatistic,
    );
    listStatisticOrder = [...orders];
    listStatisticOrder = this.initDataByFilter(
      filterStatistic,
      listStatisticOrder,
      startOfDateConvert,
      endOfDateConvert,
    );
    console.log('Set Cache');
    // this.cacheService.set(filterStatistic, listStatisticOrder);
    return listStatisticOrder.length !== 0 ? listStatisticOrder : [];
  }

  initDataByFilter(
    option: string,
    listStatisticOrder: StatisticOrder[],
    startOfDate: Date,
    endOfDate: Date,
  ): StatisticOrder[] {
    if (
      option === FilterStatistics.SEVENDAYSAGO ||
      option === FilterStatistics.THIRTYDAYSAGO
    ) {
      listStatisticOrder = this.initDefaultDataDate(
        listStatisticOrder,
        startOfDate,
        endOfDate,
      );
    } else {
      listStatisticOrder = this.initDefaultDataMonth(
        listStatisticOrder,
        startOfDate.getMonth() + 1,
        endOfDate.getMonth() + 1,
      );
    }
    return listStatisticOrder;
  }

  initDefaultDataMonth(
    listStatisticOrder: StatisticOrder[],
    monthStart: number,
    monthEnd: number,
  ): StatisticOrder[] {
    for (let index = monthStart; index <= monthEnd; index++) {
      const isContainsMonth: boolean = this.isContainsMonth(
        listStatisticOrder,
        index,
      );
      if (!isContainsMonth) {
        listStatisticOrder.push({ month: index, totalPrice: 0 });
      }
    }
    listStatisticOrder.sort((a, b) => a.month - b.month);
    return listStatisticOrder;
  }

  initDefaultDataDate(
    listStatisticOrder: StatisticOrder[],
    startOfDate: Date,
    endOfDate: Date,
  ): StatisticOrder[] {
    while (startOfDate <= endOfDate) {
      const isContainsDataOfMonth: boolean = this.isContainsDateOfMonth(
        listStatisticOrder,
        startOfDate.getDate(),
        startOfDate.getMonth() + 1,
      );
      if (!isContainsDataOfMonth) {
        listStatisticOrder.push({
          date: startOfDate.getDate(),
          month: startOfDate.getMonth() + 1,
          totalPrice: 0,
        });
      }
      startOfDate.setDate(startOfDate.getDate() + 1);
    }
    listStatisticOrder.sort((a, b) => a.month - b.month || a.date - b.date);
    return listStatisticOrder;
  }

  isContainsMonth(
    listStatisticOrder: StatisticOrder[],
    month: number,
  ): boolean {
    return listStatisticOrder.filter(item => item.month === month).length > 0
      ? true
      : false;
  }

  isContainsDateOfMonth(
    listStatisticOrder: StatisticOrder[],
    date: number,
    month: number,
  ): boolean {
    return listStatisticOrder.filter(
      item => item.date === date && item.month === month,
    ).length > 0
      ? true
      : false;
  }
  // async getStatisticOrderInCache(key: string): Promise<StatisticOrder[]> {
  //   const isExistInCache = await checkCacheStore(this.cacheService, key);
  //   return isExistInCache ? this.cacheService.get(key) : [];
  // }
}
