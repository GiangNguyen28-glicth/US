"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
let CloudinaryService = class CloudinaryService {
    async uploadImage({ stream }) {
        try {
            await new Promise((resolve, reject) => {
                const streamLoad = cloudinary_1.v2.uploader.upload_stream(function (error, result) {
                    if (result) {
                        const resultUrl = result.secure_url;
                        const resultSecureUrl = result.secure_url;
                        resolve(resultUrl);
                    }
                    else {
                        reject(error);
                    }
                });
                stream.pipe(streamLoad);
            });
        }
        catch (err) {
            throw new common_1.BadRequestException(`Failed to upload profile picture ! Err:${err.message}`);
        }
    }
};
CloudinaryService = __decorate([
    (0, common_1.Injectable)()
], CloudinaryService);
exports.CloudinaryService = CloudinaryService;
//# sourceMappingURL=cloudinary.service.js.map