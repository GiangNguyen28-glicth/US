"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moongoseConfig = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
mongoose_2.default.set('debug', process.env.NODE_ENV === 'prod' ? false : true);
exports.moongoseConfig = mongoose_1.MongooseModule.forRoot(process.env.MONGO_URI_LOCALHOST, {
    user: process.env.MONGO_USERNAME,
    pass: process.env.MONGO_PASSWORD,
    connectionFactory: connection => {
        connection.plugin(require('mongoose-autopopulate'));
        return connection;
    },
});
//# sourceMappingURL=moongose.config.js.map