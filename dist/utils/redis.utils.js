"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCacheStore = void 0;
async function checkCacheStore(cacheService, key) {
    const valueInCache = await cacheService.get(key);
    if (valueInCache) {
        return true;
    }
    return false;
}
exports.checkCacheStore = checkCacheStore;
//# sourceMappingURL=redis.utils.js.map