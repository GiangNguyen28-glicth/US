import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  MongooseHealthIndicator,
} from '@nestjs/terminus';
import { SkipThrottle } from '@nestjs/throttler';
import { DogHealthIndicator } from './health-indicators/dog.health';

@Controller('health')
@SkipThrottle()
export class HealthCheckerController {
  constructor(
    private healthCheckService: HealthCheckService,
    private mongoIndicator: MongooseHealthIndicator,
    private dogHealthIndicator: DogHealthIndicator,
  ) {}

  @Get('/database')
  @HealthCheck()
  checkHealthMoongose(): Promise<HealthCheckResult> {
    return this.healthCheckService.check([
      () => this.mongoIndicator.pingCheck('database', { timeout: 1500 }),
    ]);
  }
  @Get('/dogs')
  @HealthCheck()
  healthCheck() {
    console.log('Running here !!!');
    return this.healthCheckService.check([
      async () => this.dogHealthIndicator.isHealthy('dog'),
    ]);
  }
}
