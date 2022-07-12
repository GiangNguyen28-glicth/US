import { Module } from '@nestjs/common';
import { HealthCheckerController } from './health-checker.controller';
import { TerminusModule } from '@nestjs/terminus';
import { DogHealthIndicator } from './health-indicators/dog.health';

@Module({
  imports: [TerminusModule],
  controllers: [HealthCheckerController],
  providers: [DogHealthIndicator],
})
export class HealthCheckerModule {}
