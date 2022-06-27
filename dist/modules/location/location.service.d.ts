import { District } from './entities/district.entities';
import { Province } from './entities/province.entities';
import { Wards } from './entities/wards.entites';
export declare class LocationService {
    findProvince(): Promise<Province[]>;
    findDistrict(province_code: number): Promise<District[]>;
    findWards(district_code: number): Promise<Wards[]>;
}
