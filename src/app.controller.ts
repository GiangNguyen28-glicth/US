import { Controller, Get, Req } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import os from 'os';
import DeviceDetector from 'node-device-detector';
import { Request } from 'express';
@Controller()
@SkipThrottle()
export class AppController {
  @Get()
  testOs(@Req() req: Request): string {
    const detector = new DeviceDetector({
      clientIndexes: true,
      deviceIndexes: true,
      deviceAliasCode: false,
    });
    console.log(req.get('User-Agent'));
    const userAgent =
      'Mozilla/5.0 (Linux; Android 5.0; NX505J Build/KVT49L) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.78 Mobile Safari/537.36';
    const result = detector.detect(req.get('User-Agent'));
    console.log('result parse', result);
    return os.hostname();
  }
}
