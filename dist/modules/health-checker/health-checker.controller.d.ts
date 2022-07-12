import { HealthCheckResult, HealthCheckService, MongooseHealthIndicator } from '@nestjs/terminus';
import { DogHealthIndicator } from './health-indicators/dog.health';
export declare class HealthCheckerController {
    private healthCheckService;
    private mongoIndicator;
    private dogHealthIndicator;
    constructor(healthCheckService: HealthCheckService, mongoIndicator: MongooseHealthIndicator, dogHealthIndicator: DogHealthIndicator);
    checkHealthMoongose(): Promise<HealthCheckResult>;
    healthCheck(): Promise<HealthCheckResult>;
}
