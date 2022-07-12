"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThrottlerConfigService = void 0;
class ThrottlerConfigService {
    createThrottlerOptions() {
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
exports.ThrottlerConfigService = ThrottlerConfigService;
//# sourceMappingURL=throttler.config.js.map