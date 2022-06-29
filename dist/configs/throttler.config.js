"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throttlerConfig = void 0;
const throttler_1 = require("@nestjs/throttler");
exports.throttlerConfig = throttler_1.ThrottlerModule.forRoot({
    ttl: +process.env.THROTTLER_TTL,
    limit: +process.env.THROTTLER_LIMIT,
    ignoreUserAgents: [/googlebot/gi, /bingbot/gi, /ia_archiver/gi, /facebot/gi],
});
//# sourceMappingURL=throttler.config.js.map