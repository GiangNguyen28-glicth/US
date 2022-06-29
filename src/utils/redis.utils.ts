import { Cache } from 'cache-manager';
export async function checkCacheStore(
  cacheService: Cache,
  key: string,
): Promise<boolean> {
  const valueInCache = await cacheService.get(key);
  if (valueInCache) {
    return true;
  }
  return false;
}
