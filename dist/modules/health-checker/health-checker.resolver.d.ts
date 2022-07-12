import { HealthCheckResult, HealthCheckService, MongooseHealthIndicator } from '@nestjs/terminus';
export declare class HealthCheckerResolver {
    private healthCheckService;
    private mongoIndicator;
    constructor(healthCheckService: HealthCheckService, mongoIndicator: MongooseHealthIndicator);
    checkHealthMoongose(): Promise<HealthCheckResult>;
}
