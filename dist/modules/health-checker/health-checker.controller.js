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
exports.HealthCheckerController = void 0;
const common_1 = require("@nestjs/common");
const terminus_1 = require("@nestjs/terminus");
const throttler_1 = require("@nestjs/throttler");
const dog_health_1 = require("./health-indicators/dog.health");
let HealthCheckerController = class HealthCheckerController {
    constructor(healthCheckService, mongoIndicator, dogHealthIndicator) {
        this.healthCheckService = healthCheckService;
        this.mongoIndicator = mongoIndicator;
        this.dogHealthIndicator = dogHealthIndicator;
    }
    checkHealthMoongose() {
        return this.healthCheckService.check([
            () => this.mongoIndicator.pingCheck('database', { timeout: 1500 }),
        ]);
    }
    healthCheck() {
        console.log('Running here !!!');
        return this.healthCheckService.check([
            async () => this.dogHealthIndicator.isHealthy('dog'),
        ]);
    }
};
__decorate([
    (0, common_1.Get)('/database'),
    (0, terminus_1.HealthCheck)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthCheckerController.prototype, "checkHealthMoongose", null);
__decorate([
    (0, common_1.Get)('/dogs'),
    (0, terminus_1.HealthCheck)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HealthCheckerController.prototype, "healthCheck", null);
HealthCheckerController = __decorate([
    (0, common_1.Controller)('health'),
    (0, throttler_1.SkipThrottle)(),
    __metadata("design:paramtypes", [terminus_1.HealthCheckService,
        terminus_1.MongooseHealthIndicator,
        dog_health_1.DogHealthIndicator])
], HealthCheckerController);
exports.HealthCheckerController = HealthCheckerController;
//# sourceMappingURL=health-checker.controller.js.map