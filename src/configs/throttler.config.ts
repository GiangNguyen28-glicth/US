import { ThrottlerModule } from '@nestjs/throttler';

export const throttlerConfig = ThrottlerModule.forRoot({
  ttl: +process.env.THROTTLER_TTL,
  limit: +process.env.THROTTLER_LIMIT,
  ignoreUserAgents: [/googlebot/gi, /bingbot/gi, /ia_archiver/gi, /facebot/gi],
});
