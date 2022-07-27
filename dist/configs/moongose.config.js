"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoongoseConfigService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set('debug', process.env.NODE_ENV === 'prod' ? false : true);
let MoongoseConfigService = class MoongoseConfigService {
    createMongooseOptions() {
        return {
            uri: process.env.MONGO_URI,
            user: process.env.MONGO_USERNAME,
            pass: process.env.MONGO_PASSWORD,
            connectionFactory: connection => {
                connection.plugin(require('mongoose-autopopulate'));
                return connection;
            },
        };
    }
};
MoongoseConfigService = __decorate([
    (0, common_1.Injectable)()
], MoongoseConfigService);
exports.MoongoseConfigService = MoongoseConfigService;
//# sourceMappingURL=moongose.config.js.map