"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const core_1 = require("@nestjs/core");
const os_1 = __importDefault(require("os"));
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const graphqlUploadExpress_js_1 = __importDefault(require("graphql-upload/graphqlUploadExpress.js"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const constants_1 = require("./constants/constants");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.set('trust proxy', process.env.NODE_ENV !== 'production');
    app.use((0, cookie_parser_1.default)());
    app.useGlobalPipes(new common_1.ValidationPipe());
    process.env.UV_THREADPOOL_SIZE = os_1.default.cpus().length.toString();
    app.use(express_1.default.json({ limit: '1mb' }));
    app.use(express_1.default.urlencoded({ limit: '1mb', extended: true }));
    app.use((0, graphqlUploadExpress_js_1.default)({
        maxFiles: 100,
        maxFileSize: 10000000,
    }));
    constants_1.Constants.generateStatisticOrder();
    await app.listen(process.env.PORT || 3000, function () { });
}
bootstrap();
//# sourceMappingURL=main.js.map