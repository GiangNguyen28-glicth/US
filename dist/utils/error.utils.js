"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRequest = void 0;
async function handleRequest(promise) {
    try {
        const data = await promise;
        return [data, null];
    }
    catch (error) {
        return [null, error];
    }
}
exports.handleRequest = handleRequest;
//# sourceMappingURL=error.utils.js.map