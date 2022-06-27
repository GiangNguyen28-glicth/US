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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const district_entities_1 = require("./entities/district.entities");
const province_entities_1 = require("./entities/province.entities");
const wards_entites_1 = require("./entities/wards.entites");
const location_service_1 = require("./location.service");
let LocationResolver = class LocationResolver {
    constructor(locationService) {
        this.locationService = locationService;
    }
    async getProvince() {
        return await this.locationService.findProvince();
    }
    async getDistrict(province_code) {
        return await this.locationService.findDistrict(province_code);
    }
    async getWards(district_code) {
        return await this.locationService.findWards(district_code);
    }
};
__decorate([
    (0, graphql_1.Query)(() => [province_entities_1.Province]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LocationResolver.prototype, "getProvince", null);
__decorate([
    (0, graphql_1.Query)(() => [district_entities_1.District]),
    __param(0, (0, graphql_1.Args)('province_code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LocationResolver.prototype, "getDistrict", null);
__decorate([
    (0, graphql_1.Query)(() => [wards_entites_1.Wards]),
    __param(0, (0, graphql_1.Args)('district_code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LocationResolver.prototype, "getWards", null);
LocationResolver = __decorate([
    (0, graphql_1.Resolver)('Location'),
    __metadata("design:paramtypes", [location_service_1.LocationService])
], LocationResolver);
exports.LocationResolver = LocationResolver;
//# sourceMappingURL=location.resolver.js.map