"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const enum_1 = require("../../constants/enum");
const feature_utils_1 = require("../../utils/feature.utils");
const order_service_1 = require("../order/order.service");
const user_service_1 = require("../user/user.service");
let DashboardService = class DashboardService {
    constructor(orderService, userService) {
        this.orderService = orderService;
        this.userService = userService;
    }
    async statistic(filterStatistic) {
        const [startOfDate, endOfDate] = (0, feature_utils_1.statisticFormatDateToString)(filterStatistic);
        const users = await this.userService.getUserByDate(startOfDate, endOfDate);
        return users;
    }
    async statisticOrder(filterStatistic) {
        let listStatisticOrder = [];
        const [startOfDate, endOfDate] = (0, feature_utils_1.statisticFormatDateToString)(filterStatistic);
        let endOfDateConvert = new Date(endOfDate);
        endOfDateConvert = (0, feature_utils_1.setLastDate)(endOfDateConvert);
        let startOfDateConvert = new Date(startOfDate);
        startOfDateConvert = (0, feature_utils_1.setStartDate)(startOfDateConvert);
        const orders = await this.orderService.statisticOrder(startOfDateConvert, endOfDateConvert, filterStatistic);
        listStatisticOrder = [...orders];
        listStatisticOrder = this.initDataByFilter(filterStatistic, listStatisticOrder, startOfDateConvert, endOfDateConvert);
        console.log('Set Cache');
        return listStatisticOrder.length !== 0 ? listStatisticOrder : [];
    }
    initDataByFilter(option, listStatisticOrder, startOfDate, endOfDate) {
        if (option === enum_1.FilterStatistics.SEVENDAYSAGO ||
            option === enum_1.FilterStatistics.THIRTYDAYSAGO) {
            listStatisticOrder = this.initDefaultDataDate(listStatisticOrder, startOfDate, endOfDate);
        }
        else {
            listStatisticOrder = this.initDefaultDataMonth(listStatisticOrder, startOfDate.getMonth() + 1, endOfDate.getMonth() + 1);
        }
        return listStatisticOrder;
    }
    initDefaultDataMonth(listStatisticOrder, monthStart, monthEnd) {
        for (let index = monthStart; index <= monthEnd; index++) {
            const isContainsMonth = this.isContainsMonth(listStatisticOrder, index);
            if (!isContainsMonth) {
                listStatisticOrder.push({ month: index, totalPrice: 0 });
            }
        }
        listStatisticOrder.sort((a, b) => a.month - b.month);
        return listStatisticOrder;
    }
    initDefaultDataDate(listStatisticOrder, startOfDate, endOfDate) {
        while (startOfDate <= endOfDate) {
            const isContainsDataOfMonth = this.isContainsDateOfMonth(listStatisticOrder, startOfDate.getDate(), startOfDate.getMonth() + 1);
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
    isContainsMonth(listStatisticOrder, month) {
        return listStatisticOrder.filter(item => item.month === month).length > 0
            ? true
            : false;
    }
    isContainsDateOfMonth(listStatisticOrder, date, month) {
        return listStatisticOrder.filter(item => item.date === date && item.month === month).length > 0
            ? true
            : false;
    }
};
DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [order_service_1.OrderService,
        user_service_1.UserService])
], DashboardService);
exports.DashboardService = DashboardService;
//# sourceMappingURL=dashboard.service.js.map