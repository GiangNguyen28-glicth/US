import { Cache } from 'cache-manager';
export async function getValueWithSocketKey(
  cacheManager: Cache,
  socketKey: string[],
): Promise<any> {
  let socketIds: string[] = [];
  for (let i = 0; i < socketKey.length; i++) {
    const cacheValue = await cacheManager.get(socketKey[i]);
    if (cacheValue) {
      socketIds = socketIds.concat(cacheValue);
    }
  }
  return socketIds;
}
