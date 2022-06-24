import { CacheModule } from '@nestjs/common';
import { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
export const cacheConfig = CacheModule.register<RedisClientOptions>({
  store: redisStore,
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  ttl: +process.env.CACHE_TTL,
  max: parseInt(process.env.REDIS_MAX_SIZE),
});
