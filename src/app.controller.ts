import { Controller, Get } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import os from 'os';
@Controller()
@SkipThrottle()
export class AppController {
  @Get()
  testOs(): string {
    console.log(os.hostname());
    return os.hostname();
  }
}
