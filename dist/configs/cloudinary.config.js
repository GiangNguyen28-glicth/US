"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryProvider = void 0;
const constants_1 = require("../constants/constants");
const cloudinary_1 = require("cloudinary");
exports.CloudinaryProvider = {
    provide: constants_1.Constants.CLOUDINARY,
    useFactory: () => {
        return cloudinary_1.v2.config({
            cloud_name: 'Your cloud name',
            api_key: 'Your api key',
            api_secret: 'Your api secret',
        });
    },
};
//# sourceMappingURL=cloudinary.config.js.map