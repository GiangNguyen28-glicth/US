import { HealthCheckStatus, HealthIndicatorResult } from '@nestjs/terminus';
export declare class HealthCheckEntities {
    status: HealthCheckStatus;
    info?: HealthIndicatorResult;
    error?: HealthIndicatorResult;
    details: HealthIndicatorResult;
}
