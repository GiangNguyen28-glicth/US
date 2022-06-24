import { Args, Query, Resolver } from '@nestjs/graphql';
import { District } from './entities/district.entities';
import { Province } from './entities/province.entities';
import { Wards } from './entities/wards.entites';
import { LocationService } from './location.service';

@Resolver('Location')
export class LocationResolver {
  constructor(private locationService: LocationService) {}
  @Query(() => [Province])
  async getProvince(): Promise<Province[]> {
    return await this.locationService.findProvince();
  }
  @Query(() => [District])
  async getDistrict(
    @Args('province_code') province_code: number,
  ): Promise<District[]> {
    return await this.locationService.findDistrict(province_code);
  }
  @Query(() => [Wards])
  async getWards(
    @Args('district_code') district_code: number,
  ): Promise<Wards[]> {
    return await this.locationService.findWards(district_code);
  }
}
