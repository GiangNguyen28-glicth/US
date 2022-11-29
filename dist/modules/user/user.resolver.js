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
exports.UserResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const graphql_scalars_1 = require("graphql-scalars");
const getuser_decorators_1 = require("../../common/decorators/getuser.decorators");
const role_decorators_1 = require("../../common/decorators/role.decorators");
const at_guard_1 = require("../../common/guard/at.guard");
const role_guard_1 = require("../../common/guard/role.guard");
const constants_1 = require("../../constants/constants");
const enum_1 = require("../../constants/enum");
const common_dto_1 = require("../common/dto/common.dto");
const GraphQLUpload_js_1 = __importDefault(require("graphql-upload/GraphQLUpload.js"));
const Upload_js_1 = __importDefault(require("graphql-upload/Upload.js"));
const create_user_dto_1 = require("./dto/create-user.dto");
const user_entities_1 = require("./entities/user.entities");
const user_helper_1 = require("./helper/user.helper");
const user_service_1 = require("./user.service");
let UserResolver = class UserResolver {
    constructor(userService, userHelper) {
        this.userService = userService;
        this.userHelper = userHelper;
    }
    updateProfile(user, input) {
        return this.userService.updateProfile(user, input, constants_1.Constants.UPDATE_PROFILE);
    }
    changeSetting(user, input) {
        return this.userService.updateProfile(user, input, constants_1.Constants.CHANGE_SETTING);
    }
    skipUser(user_id, user) {
        return this.userService.skipUser(user, user_id);
    }
    unSkipUser(user_id, user) {
        return this.userService.unSkipUser(user, user_id);
    }
    likeUser(user_id, user) {
        return this.userService.likeUser(user_id, user);
    }
    unlikeUser(user_id, user) {
        return this.userService.unlikeUser(user, user_id);
    }
    unMatched(user_id, user) {
        return this.userService.unMatched(user, user_id);
    }
    reportUser(reasonReport, descriptionReport, user_id, user) {
        return this.userService.reportUser(reasonReport, descriptionReport, user_id, user);
    }
    calUserPercent() {
        return this.userHelper.calUserPercent();
    }
    confirmBlockUser(user_id) {
        return this.userHelper.confirmBlockUser(user_id);
    }
    declineBlockUser(user_id) {
        return this.userHelper.declineBlockUser(user_id);
    }
    updateLocation(user, coordinates) {
        return this.userHelper.setNewInfoAfterLogin(user, coordinates);
    }
    async uploadFile(file) {
        const { createReadStream } = await file;
        const stream = createReadStream();
        const url = await this.userHelper.uploadImage({ stream });
        return url;
    }
    deleteFile(fileName) {
        return this.userHelper.removeUpload(fileName);
    }
    getAllReportsUser(pagination) {
        return this.userHelper.getAllReportedUser(pagination);
    }
    statisticUser(pagination, filter) {
        return this.userHelper.statisticUser(pagination, filter);
    }
    createMultiUser() {
        try {
            return this.userService.insertManyUser();
        }
        catch (error) {
            throw error;
        }
    }
    getCurrentAddress(user) {
        return this.userHelper.getCurrentAddress(user);
    }
    getCurrentUser(user) {
        return user;
    }
    getAllUser(pagination, filter, user) {
        return this.userService.getAllUser(pagination, filter, user);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, common_1.UseGuards)(at_guard_1.AtGuard),
    __param(0, (0, getuser_decorators_1.GetUser)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entities_1.User,
        create_user_dto_1.UpdateUserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateProfile", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, common_1.UseGuards)(at_guard_1.AtGuard),
    __param(0, (0, getuser_decorators_1.GetUser)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entities_1.User,
        create_user_dto_1.MySettingInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "changeSetting", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, common_1.UseGuards)(at_guard_1.AtGuard),
    __param(0, (0, graphql_1.Args)('user_id', { type: () => graphql_scalars_1.GraphQLObjectID })),
    __param(1, (0, getuser_decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entities_1.User]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "skipUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, common_1.UseGuards)(at_guard_1.AtGuard),
    __param(0, (0, graphql_1.Args)('user_id', { type: () => graphql_scalars_1.GraphQLObjectID })),
    __param(1, (0, getuser_decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entities_1.User]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "unSkipUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, common_1.UseGuards)(at_guard_1.AtGuard),
    __param(0, (0, graphql_1.Args)('user_id', { type: () => graphql_scalars_1.GraphQLObjectID })),
    __param(1, (0, getuser_decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entities_1.User]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "likeUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, common_1.UseGuards)(at_guard_1.AtGuard),
    __param(0, (0, graphql_1.Args)('user_id', { type: () => graphql_scalars_1.GraphQLObjectID })),
    __param(1, (0, getuser_decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entities_1.User]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "unlikeUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, common_1.UseGuards)(at_guard_1.AtGuard),
    __param(0, (0, graphql_1.Args)('user_id', { type: () => graphql_scalars_1.GraphQLObjectID })),
    __param(1, (0, getuser_decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entities_1.User]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "unMatched", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, common_1.UseGuards)(at_guard_1.AtGuard),
    __param(0, (0, graphql_1.Args)('reasonReport')),
    __param(1, (0, graphql_1.Args)('reportDetail')),
    __param(2, (0, graphql_1.Args)('userReport', { type: () => graphql_scalars_1.GraphQLObjectID })),
    __param(3, (0, getuser_decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, user_entities_1.User]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "reportUser", null);
__decorate([
    (0, graphql_1.Query)(() => Number),
    (0, common_1.UseGuards)(at_guard_1.AtGuard, role_guard_1.RolesGuard),
    (0, role_decorators_1.hasRoles)(enum_1.RoleEnum.ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "calUserPercent", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, common_1.UseGuards)(at_guard_1.AtGuard, role_guard_1.RolesGuard),
    (0, role_decorators_1.hasRoles)(enum_1.RoleEnum.ADMIN),
    __param(0, (0, graphql_1.Args)('user_id', { type: () => graphql_scalars_1.GraphQLObjectID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "confirmBlockUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, common_1.UseGuards)(at_guard_1.AtGuard, role_guard_1.RolesGuard),
    (0, role_decorators_1.hasRoles)(enum_1.RoleEnum.ADMIN),
    __param(0, (0, graphql_1.Args)('user_id', { type: () => graphql_scalars_1.GraphQLObjectID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "declineBlockUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, common_1.UseGuards)(at_guard_1.AtGuard),
    __param(0, (0, getuser_decorators_1.GetUser)()),
    __param(1, (0, graphql_1.Args)('coordinates', {
        type: () => [graphql_1.Float],
        description: 'Position 0 is Longitude , 1 is Latitude',
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entities_1.User, Array]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateLocation", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)({ name: 'file', type: () => GraphQLUpload_js_1.default })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof Upload_js_1.default !== "undefined" && Upload_js_1.default) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "uploadFile", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('fileUrl')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteFile", null);
__decorate([
    (0, graphql_1.Query)(() => user_entities_1.UserResult),
    (0, common_1.UseGuards)(at_guard_1.AtGuard, role_guard_1.RolesGuard),
    (0, role_decorators_1.hasRoles)(enum_1.RoleEnum.ADMIN),
    __param(0, (0, graphql_1.Args)('pagination', { type: () => common_dto_1.PaginationInput, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_dto_1.PaginationInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getAllReportsUser", null);
__decorate([
    (0, graphql_1.Query)(() => user_entities_1.UserResult),
    (0, common_1.UseGuards)(at_guard_1.AtGuard, role_guard_1.RolesGuard),
    __param(0, (0, graphql_1.Args)('pagination', { type: () => common_dto_1.PaginationInput, nullable: true })),
    __param(1, (0, graphql_1.Args)('filter', { type: () => create_user_dto_1.FilterStatisticUser, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_dto_1.PaginationInput,
        create_user_dto_1.FilterStatisticUser]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "statisticUser", null);
__decorate([
    (0, graphql_1.Query)(() => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "createMultiUser", null);
__decorate([
    (0, graphql_1.Query)(() => user_entities_1.Address),
    (0, common_1.UseGuards)(at_guard_1.AtGuard),
    __param(0, (0, getuser_decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entities_1.User]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getCurrentAddress", null);
__decorate([
    (0, graphql_1.Query)(() => user_entities_1.User),
    (0, common_1.UseGuards)(at_guard_1.AtGuard),
    __param(0, (0, getuser_decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entities_1.User]),
    __metadata("design:returntype", user_entities_1.User)
], UserResolver.prototype, "getCurrentUser", null);
__decorate([
    (0, graphql_1.Query)(() => user_entities_1.UserResult),
    (0, common_1.UseGuards)(at_guard_1.AtGuard),
    __param(0, (0, graphql_1.Args)('pagination', { type: () => common_dto_1.PaginationInput, nullable: true })),
    __param(1, (0, graphql_1.Args)('filter', { type: () => create_user_dto_1.FilterGetAllUser, nullable: true })),
    __param(2, (0, getuser_decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_dto_1.PaginationInput,
        create_user_dto_1.FilterGetAllUser,
        user_entities_1.User]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getAllUser", null);
UserResolver = __decorate([
    (0, graphql_1.Resolver)(user_entities_1.User.name),
    __metadata("design:paramtypes", [user_service_1.UserService,
        user_helper_1.UserHelper])
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.resolver.js.map