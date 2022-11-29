"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const express_1 = __importDefault(require("express"));
const graphqlUploadExpress_js_1 = __importDefault(require("graphql-upload/graphqlUploadExpress.js"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const common_1 = require("@nestjs/common");
const logger_service_1 = require("./modules/logger/logger.service");
const fs_1 = __importDefault(require("fs"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const dir = '../../tmp';
    if (!fs_1.default.existsSync(dir)) {
        fs_1.default.mkdirSync(dir);
    }
    app.set('trust proxy', process.env.NODE_ENV !== 'production');
    app.use((0, cookie_parser_1.default)());
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.use(express_1.default.json({ limit: '1mb' }));
    app.use(express_1.default.urlencoded({ limit: '1mb', extended: true }));
    app.enableCors({
        credentials: true,
        origin: '*',
    });
    app.use((0, graphqlUploadExpress_js_1.default)({
        maxFiles: 100,
        maxFileSize: 10000000,
    }));
    app.useLogger(new logger_service_1.LoggerService());
    await app.listen(process.env.PORT || 2000);
}
bootstrap();
//# sourceMappingURL=main.js.map