"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValueWithSocketKey = void 0;
async function getValueWithSocketKey(cacheManager, socketKey) {
    let socketIds = [];
    for (let i = 0; i < socketKey.length; i++) {
        const cacheValue = await cacheManager.get(socketKey[i]);
        if (cacheValue) {
            socketIds = socketIds.concat(cacheValue);
        }
    }
    return socketIds;
}
exports.getValueWithSocketKey = getValueWithSocketKey;
//# sourceMappingURL=redis.utils.js.map