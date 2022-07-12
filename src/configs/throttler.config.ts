import {
  ThrottlerModuleOptions,
  ThrottlerOptionsFactory,
} from '@nestjs/throttler';

export class ThrottlerConfigService implements ThrottlerOptionsFactory {
  createThrottlerOptions():
    | ThrottlerModuleOptions
    | Promise<ThrottlerModuleOptions> {
    return {
      ttl: +process.env.THROTTLER_TTL,
      limit: +process.env.THROTTLER_LIMIT,
      ignoreUserAgents: [
        /googlebot/gi,
        /bingbot/gi,
        /ia_archiver/gi,
        /facebot/gi,
      ],
    };
  }
}
