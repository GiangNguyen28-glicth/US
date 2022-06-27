"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheConfig = void 0;
const common_1 = require("@nestjs/common");
const redisStore = require("cache-manager-redis-store");
exports.cacheConfig = common_1.CacheModule.register({
    store: redisStore,
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    ttl: +process.env.CACHE_TTL,
    max: parseInt(process.env.REDIS_MAX_SIZE),
});
//# sourceMappingURL=cache.config.js.map