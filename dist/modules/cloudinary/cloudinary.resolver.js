"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const GraphQLUpload_js_1 = __importDefault(require("graphql-upload/GraphQLUpload.js"));
const Upload_js_1 = __importDefault(require("graphql-upload/Upload.js"));
const cloudinary_service_1 = require("./cloudinary.service");
let CloudinaryResolver = class CloudinaryResolver {
    constructor(cloudinaryService) {
        this.cloudinaryService = cloudinaryService;
    }
    async uploadFile(file) {
        const { createReadStream } = await file;
        const stream = createReadStream();
        await this.cloudinaryService.uploadImage({ stream });
        return 'Hello';
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)({ name: 'file', type: () => GraphQLUpload_js_1.default })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof Upload_js_1.default !== "undefined" && Upload_js_1.default) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], CloudinaryResolver.prototype, "uploadFile", null);
CloudinaryResolver = __decorate([
    (0, graphql_1.Resolver)('Cloudinary'),
    __metadata("design:paramtypes", [cloudinary_service_1.CloudinaryService])
], CloudinaryResolver);
exports.CloudinaryResolver = CloudinaryResolver;
//# sourceMappingURL=cloudinary.resolver.js.map