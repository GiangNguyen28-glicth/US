import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { response } from 'express';
import { District } from './entities/district.entities';
import { Province } from './entities/province.entities';
import { Wards } from './entities/wards.entites';

@Injectable()
export class LocationService {
  async findProvince(): Promise<Province[]> {
    const response = await axios.get('https://provinces.open-api.vn/api/');
    const listProvince: Province[] = response.data;
    return listProvince;
  }

  async findDistrict(province_code: number): Promise<District[]> {
    const response = await axios.get(
      'https://provinces.open-api.vn/api/p/' + province_code + '?depth=2',
    );
    const listDistrict: District[] = response.data.districts;
    return listDistrict;
  }

  async findWards(district_code: number): Promise<Wards[]> {
    const response = await axios.get(
      'https://provinces.open-api.vn/api/d/' + district_code + '?depth=2',
    );
    const listWards: Wards[] = response.data.wards;
    return listWards;
  }
}
