"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let LocationService = class LocationService {
    async findProvince() {
        const response = await axios_1.default.get('https://provinces.open-api.vn/api/');
        const listProvince = response.data;
        return listProvince;
    }
    async findDistrict(province_code) {
        const response = await axios_1.default.get('https://provinces.open-api.vn/api/p/' + province_code + '?depth=2');
        const listDistrict = response.data.districts;
        return listDistrict;
    }
    async findWards(district_code) {
        const response = await axios_1.default.get('https://provinces.open-api.vn/api/d/' + district_code + '?depth=2');
        const listWards = response.data.wards;
        return listWards;
    }
};
LocationService = __decorate([
    (0, common_1.Injectable)()
], LocationService);
exports.LocationService = LocationService;
//# sourceMappingURL=location.service.js.map