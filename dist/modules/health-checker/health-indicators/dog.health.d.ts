import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
export interface Dog {
    name: string;
    type: string;
}
export declare class DogHealthIndicator extends HealthIndicator {
    private dogs;
    isHealthy(key: string): Promise<HealthIndicatorResult>;
}
