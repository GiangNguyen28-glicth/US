import { District } from './entities/district.entities';
import { Province } from './entities/province.entities';
import { Wards } from './entities/wards.entites';
import { LocationService } from './location.service';
export declare class LocationResolver {
    private locationService;
    constructor(locationService: LocationService);
    getProvince(): Promise<Province[]>;
    getDistrict(province_code: number): Promise<District[]>;
    getWards(district_code: number): Promise<Wards[]>;
}
