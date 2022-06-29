"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryProvider = void 0;
const constants_1 = require("../../constants/constants");
const cloudinary_1 = require("cloudinary");
exports.CloudinaryProvider = {
    provide: constants_1.Constants.CLOUDINARY,
    useFactory: () => {
        return cloudinary_1.v2.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY_CLOUD,
            api_secret: process.env.API_SECRET_CLOUD,
        });
    },
};
//# sourceMappingURL=cloudinary.provider.js.map