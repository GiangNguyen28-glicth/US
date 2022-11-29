import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { v2 } from 'cloudinary';
import { Constants } from '../../../constants/constants';
import { RoleEnum, StatusActive } from '../../../constants/enum';
import { FilterBuilder } from '../../../utils/filter.query';
import {
  setFilterByDate,
  setLastDate,
  setStartDate,
} from '../../../utils/utils';
import { PaginationInput } from '../../common/dto/common.dto';
import { LoggerService } from '../../logger/logger.service';
import { UserEmbeddedService } from '../../user_embedded/user_embedded.service';
import { FilterGetAllUser, FilterStatisticUser } from '../dto/create-user.dto';
import { Address, User, UserResult } from '../entities/user.entities';
import { UserModelType } from '../schema/user.schema';
@Injectable()
export class UserHelper {
  constructor(
    @InjectModel(User.name) private userModel: UserModelType,
    private loggerService: LoggerService,
    private userEmbeddedService: UserEmbeddedService,
  ) {}

  async buildQueryWithUser(user: User, filter: FilterGetAllUser): Promise<any> {
    const isApplyAge = user.mySetting.discovery.onlyShowAgeThisRange;
    const queryFilter: FilterBuilder<User> = new FilterBuilder<User>()
      .setFilterItem('matched', { $in: filter?.matched }, filter?.matched)
      .setFilterItem(
        'statusActive',
        { $eq: filter?.statusActive },
        filter?.statusActive,
      )
      .setFilterItem('isFirstLogin', { $eq: false }, 'true')
      .setFilterItem(
        'showMeTinder',
        { $eq: user.showMeTinder },
        user.showMeTinder,
      );

    if (isApplyAge) {
      queryFilter.setFilterItem(
        'age',
        {
          $gte: user.mySetting.discovery.minAge,
          $lte: user.mySetting.discovery.maxAge,
        },
        user.mySetting.discovery.minAge,
      );
    }
    const [user_ids_notLike, user_ids_liked] = await Promise.all([
      this.userEmbeddedService.getAllIdsNotLike(user._id.toString()),
      this.userEmbeddedService.getAllIdsLiked(user._id.toString()),
    ]);
    user_ids_notLike.push(user._id);
    const user_ids = user_ids_notLike.concat(user_ids_liked);
    queryFilter.setFilterItem('_id', { $nin: user_ids }, user._id.toString());
    return queryFilter.buildQuery()[0];
  }

  async setNewInfoAfterLogin(
    user: User,
    coordinates: number[],
  ): Promise<boolean> {
    try {
      const [location, userUpdated] = await Promise.all([
        axios.get(
          `https://location-api-mu.vercel.app/query?lat=${coordinates[1]}&lon=${coordinates[0]}`,
        ),
        this.userModel.findOneAndUpdate(
          { _id: user._id },
          {
            $set: {
              statusActive: StatusActive.ONLINE,
              lastActive: Date.now(),
              geoLocation: {
                coordinates: [coordinates[0], coordinates[1]],
              },
            },
          },
        ),
      ]);
      this.loggerService.debug(location.data);
      const { city, district, country } = this.handleResponseAddress(location);
      userUpdated.address = new Address();
      userUpdated.address.city = city;
      userUpdated.address.district = district;
      userUpdated.address.country = country;
      return (await userUpdated.save()) ? true : false;
    } catch (error) {
      throw error;
    }
  }

  handleResponseAddress(location: any): Address {
    const state = location.data['locationDetail']['state'];
    const city_district = location.data['locationDetail']['city_district'];
    const county = location.data['locationDetail']['county'];
    let city = location.data['locationDetail']['city'];
    city = city ? city : state;
    const district = city_district ? city_district : county;
    this.loggerService.debug(
      `State: ${state},District: ${district},City: ${city}`,
    );
    const country = location.data['locationDetail']['country'];
    return { district, city, country };
  }

  async getCurrentAddress(user: User): Promise<Address> {
    const location = await axios.get(
      `https://location-api-mu.vercel.app/query?lat=${user.geoLocation.coordinates[1]}&lon=${user.geoLocation.coordinates[0]}`,
    );
    return this.handleResponseAddress(location);
  }
  // admin
  async confirmBlockUser(_id: string): Promise<boolean> {
    try {
      const user = await this.userModel.findOneAndUpdate(
        { _id },
        { $set: { isBlocked: true } },
      );
      return user ? true : false;
    } catch (error) {
      throw error;
    }
  }

  async declineBlockUser(_id: string): Promise<boolean> {
    try {
      const user = await this.userModel.findOneAndUpdate(
        { _id },
        { $set: { reports: [] } },
      );
      return user ? true : false;
    } catch (error) {
      throw error;
    }
  }

  async getAllReportedUser(pagination: PaginationInput): Promise<UserResult> {
    try {
      const query = {
        reports: { $exists: true, $ne: [] },
        isDeleted: false,
        isBlocked: false,
        role: RoleEnum.USER,
      };
      const [queryFilter, querySort] = new FilterBuilder<User>()
        .addSubQuery(query)
        .setSortItem('username', 'asc')
        .buildQuery();
      const [results, totalCount] = await Promise.all([
        this.userModel
          .find(queryFilter)
          .skip((pagination?.page - 1) * pagination?.size)
          .limit(pagination?.size)
          .populate('reports.reportBy')
          .sort(querySort),
        this.userModel.countDocuments(queryFilter),
      ]);
      return { results, totalCount };
    } catch (error) {
      throw error;
    }
  }

  async statisticUser(
    pagination: PaginationInput,
    filter: FilterStatisticUser,
  ): Promise<UserResult> {
    try {
      const queryFilterByDate = setFilterByDate(filter?.filterByDate);
      let filterInActive = null;
      if (filter?.isInActive === true) {
        const currentDate: Date = new Date();
        currentDate.setMonth(currentDate.getMonth() - 1);
        filterInActive = {
          $lte: currentDate,
        };
      }
      const [queryFilter, querySort] = new FilterBuilder()
        .addName(filter?.username)
        .setFilterItemWithObject(
          'createdAt',
          queryFilterByDate,
          queryFilterByDate,
        )
        .setFilterItemWithObject('gender', filter?.gender, filter?.gender)
        .setFilterItemWithObject('lastActive', filterInActive, filterInActive)
        .addSortOption(filter?.sortOption)
        .buildQuery();
      const [results, totalCount] = await Promise.all([
        this.userModel
          .find(queryFilter)
          .skip((pagination?.page - 1) * pagination?.size)
          .limit(pagination?.size)
          .sort(querySort),
        this.userModel.countDocuments(queryFilter),
      ]);
      return { results, totalCount };
    } catch (error) {
      throw error;
    }
  }

  async calUserPercent(): Promise<number> {
    try {
      // eslint-disable-next-line prefer-const
      let [currentMonth, lastMonth, startMonth] = [
        new Date(),
        new Date(),
        new Date(),
      ];
      lastMonth.setMonth(currentMonth.getMonth() - 1);
      lastMonth.setDate(1);
      startMonth.setDate(1);
      lastMonth = setStartDate(lastMonth);
      startMonth = setStartDate(startMonth);
      const lastDate = setLastDate(startMonth);
      const [totalUserLastMoth, totalUserThisMonth] = await Promise.all([
        this.userModel.find({
          createdAt: { $gte: lastMonth, $lte: lastDate },
        }),
        this.userModel.find({
          createdAt: { $gte: startMonth, $lte: currentMonth },
        }),
      ]);
      if (totalUserLastMoth.length === 0) {
        return totalUserThisMonth.length;
      }
      return +(totalUserThisMonth.length / totalUserLastMoth.length).toFixed(2);
    } catch (error) {
      throw error;
    }
  }

  // image
  async uploadImage({ stream }): Promise<any> {
    try {
      return new Promise((resolve, reject) => {
        const streamLoad = v2.uploader.upload_stream(function (error, result) {
          if (result) {
            const resultUrl = result.secure_url;
            resolve(resultUrl);
          } else {
            reject(error);
          }
        });
        stream.pipe(streamLoad);
      });
    } catch (err) {
      throw new BadRequestException(
        `Failed to upload profile picture ! Err:${err.message}`,
      );
    }
  }

  async removeUpload(imageUrl: string): Promise<boolean> {
    try {
      const imageName = imageUrl.split('/');
      const result = await v2.uploader.destroy(
        imageName[imageName.length - 1].split('.')[0],
        function (error, result) {
          if (result) {
            return result;
          } else {
            throw error;
          }
        },
      );
      if (result['result'] === 'not found') {
        throw new BadRequestException('Xóa file thất bại');
      }
      return result ? true : false;
    } catch (error) {
      throw error;
    }
  }

  CloudinaryProvider = {
    provide: Constants.CLOUDINARY,
    useFactory: (): any => {
      return v2.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY_CLOUD,
        api_secret: process.env.API_SECRET_CLOUD,
      });
    },
  };
}
