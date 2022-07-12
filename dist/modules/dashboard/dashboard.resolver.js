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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const role_decorator_1 = require("../../common/decorators/role.decorator");
const at_guard_1 = require("../../common/guards/at.guard");
const role_guard_1 = require("../../common/guards/role.guard");
const enum_1 = require("../../constants/enum");
const user_entities_1 = require("../user/entities/user.entities");
const dashboard_service_1 = require("./dashboard.service");
const dashboard_entities_1 = require("./entities/dashboard.entities");
let DashboardResolver = class DashboardResolver {
    constructor(dashboadService) {
        this.dashboadService = dashboadService;
    }
    statistic(input) {
        return this.dashboadService.statistic(input);
    }
    statisticOrder(input) {
        return this.dashboadService.statisticOrder(input);
    }
};
__decorate([
    (0, graphql_1.Query)(() => [user_entities_1.User]),
    __param(0, (0, graphql_1.Args)('input', { type: () => enum_1.FilterStatistics })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DashboardResolver.prototype, "statistic", null);
__decorate([
    (0, graphql_1.Query)(() => [dashboard_entities_1.StatisticOrder]),
    (0, role_decorator_1.hasRoles)(enum_1.RoleEnum.ADMIN),
    (0, common_1.UseGuards)(at_guard_1.AtGuard, role_guard_1.RolesGuard),
    __param(0, (0, graphql_1.Args)('input', { type: () => enum_1.FilterStatistics })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DashboardResolver.prototype, "statisticOrder", null);
DashboardResolver = __decorate([
    (0, graphql_1.Resolver)('Dashboard'),
    __metadata("design:paramtypes", [dashboard_service_1.DashboardService])
], DashboardResolver);
exports.DashboardResolver = DashboardResolver;
//# sourceMappingURL=dashboard.resolver.js.map