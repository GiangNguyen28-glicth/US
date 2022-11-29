import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable,
} from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
@Injectable()
export class CacheConfigService implements CacheOptionsFactory {
  createCacheOptions(): CacheModuleOptions {
    return {
      store: redisStore,
      url: `redis://${process.env.REDIS_HOST_PROD}:${process.env.REDIS_PORT_PROD}`,
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD,
      ttl: +process.env.CACHE_TTL,
      max: parseInt(process.env.REDIS_MAX_SIZE),
    };
  }
}
