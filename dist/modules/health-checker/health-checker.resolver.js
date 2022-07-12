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
exports.HealthCheckerResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const terminus_1 = require("@nestjs/terminus");
const health_check_entities_1 = require("./entities/health-check.entities");
let HealthCheckerResolver = class HealthCheckerResolver {
    constructor(healthCheckService, mongoIndicator) {
        this.healthCheckService = healthCheckService;
        this.mongoIndicator = mongoIndicator;
    }
    checkHealthMoongose() {
        return this.healthCheckService.check([
            () => this.mongoIndicator.pingCheck('database', { timeout: 1500 }),
        ]);
    }
};
__decorate([
    (0, graphql_1.Query)(() => health_check_entities_1.HealthCheckEntities),
    (0, terminus_1.HealthCheck)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthCheckerResolver.prototype, "checkHealthMoongose", null);
HealthCheckerResolver = __decorate([
    (0, graphql_1.Resolver)('Health'),
    __metadata("design:paramtypes", [terminus_1.HealthCheckService,
        terminus_1.MongooseHealthIndicator])
], HealthCheckerResolver);
exports.HealthCheckerResolver = HealthCheckerResolver;
//# sourceMappingURL=health-checker.resolver.js.map