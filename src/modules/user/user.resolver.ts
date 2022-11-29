import { UseGuards } from '@nestjs/common';
import { Args, Float, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLObjectID } from 'graphql-scalars';
import { GetUser } from '../../common/decorators/getuser.decorators';
import { hasRoles } from '../../common/decorators/role.decorators';
import { AtGuard } from '../../common/guard/at.guard';
import { RolesGuard } from '../../common/guard/role.guard';
import { Constants } from '../../constants/constants';
import { RoleEnum } from '../../constants/enum';
import { PaginationInput } from '../common/dto/common.dto';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import Upload from 'graphql-upload/Upload.js';

import {
  FilterGetAllUser,
  FilterStatisticUser,
  MySettingInput,
  UpdateUserInput,
} from './dto/create-user.dto';
import { Address, User, UserResult } from './entities/user.entities';
import { UserHelper } from './helper/user.helper';
import { UserService } from './user.service';

@Resolver(User.name)
export class UserResolver {
  constructor(
    private userService: UserService,
    private userHelper: UserHelper,
  ) {}

  @Mutation(() => Boolean)
  @UseGuards(AtGuard)
  updateProfile(
    @GetUser() user: User,
    @Args('input') input: UpdateUserInput,
  ): Promise<boolean> {
    return this.userService.updateProfile(
      user,
      input,
      Constants.UPDATE_PROFILE,
    );
  }

  @Mutation(() => Boolean)
  @UseGuards(AtGuard)
  changeSetting(
    @GetUser() user: User,
    @Args('input') input: MySettingInput,
  ): Promise<boolean> {
    return this.userService.updateProfile(
      user,
      input,
      Constants.CHANGE_SETTING,
    );
  }

  @Mutation(() => Boolean)
  @UseGuards(AtGuard)
  skipUser(
    @Args('user_id', { type: () => GraphQLObjectID }) user_id: string,
    @GetUser() user: User,
  ): Promise<boolean> {
    return this.userService.skipUser(user, user_id);
  }

  @Mutation(() => Boolean)
  @UseGuards(AtGuard)
  unSkipUser(
    @Args('user_id', { type: () => GraphQLObjectID }) user_id: string,
    @GetUser() user: User,
  ): Promise<boolean> {
    return this.userService.unSkipUser(user, user_id);
  }

  @Mutation(() => Boolean)
  @UseGuards(AtGuard)
  likeUser(
    @Args('user_id', { type: () => GraphQLObjectID }) user_id: string,
    @GetUser() user: User,
  ): Promise<boolean> {
    return this.userService.likeUser(user_id, user);
  }

  @Mutation(() => Boolean)
  @UseGuards(AtGuard)
  unlikeUser(
    @Args('user_id', { type: () => GraphQLObjectID }) user_id: string,
    @GetUser() user: User,
  ): Promise<boolean> {
    return this.userService.unlikeUser(user, user_id);
  }

  @Mutation(() => Boolean)
  @UseGuards(AtGuard)
  unMatched(
    @Args('user_id', { type: () => GraphQLObjectID }) user_id: string,
    @GetUser() user: User,
  ): Promise<boolean> {
    return this.userService.unMatched(user, user_id);
  }

  @Mutation(() => Boolean)
  @UseGuards(AtGuard)
  reportUser(
    @Args('reasonReport') reasonReport: string,
    @Args('reportDetail') descriptionReport: string,
    @Args('userReport', { type: () => GraphQLObjectID }) user_id: string,
    @GetUser() user: User,
  ): Promise<boolean> {
    return this.userService.reportUser(
      reasonReport,
      descriptionReport,
      user_id,
      user,
    );
  }

  @Query(() => Number)
  @UseGuards(AtGuard, RolesGuard)
  @hasRoles(RoleEnum.ADMIN)
  calUserPercent(): Promise<number> {
    return this.userHelper.calUserPercent();
  }

  @Mutation(() => Boolean)
  @UseGuards(AtGuard, RolesGuard)
  @hasRoles(RoleEnum.ADMIN)
  confirmBlockUser(
    @Args('user_id', { type: () => GraphQLObjectID }) user_id: string,
  ): Promise<boolean> {
    return this.userHelper.confirmBlockUser(user_id);
  }

  @Mutation(() => Boolean)
  @UseGuards(AtGuard, RolesGuard)
  @hasRoles(RoleEnum.ADMIN)
  declineBlockUser(
    @Args('user_id', { type: () => GraphQLObjectID }) user_id: string,
  ): Promise<boolean> {
    return this.userHelper.declineBlockUser(user_id);
  }

  @Mutation(() => Boolean)
  @UseGuards(AtGuard)
  updateLocation(
    @GetUser() user: User,
    @Args('coordinates', {
      type: () => [Float],
      description: 'Position 0 is Longitude , 1 is Latitude',
    })
    coordinates: number[],
  ): Promise<boolean> {
    return this.userHelper.setNewInfoAfterLogin(user, coordinates);
  }

  @Mutation(() => String)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: Upload,
  ): Promise<any> {
    const { createReadStream } = await file;
    const stream = createReadStream();
    const url = await this.userHelper.uploadImage({ stream });
    return url;
  }

  @Mutation(() => Boolean)
  deleteFile(@Args('fileUrl') fileName: string): Promise<boolean> {
    return this.userHelper.removeUpload(fileName);
  }

  @Query(() => UserResult)
  @UseGuards(AtGuard, RolesGuard)
  @hasRoles(RoleEnum.ADMIN)
  getAllReportsUser(
    @Args('pagination', { type: () => PaginationInput, nullable: true })
    pagination: PaginationInput,
  ): Promise<UserResult> {
    return this.userHelper.getAllReportedUser(pagination);
  }

  @Query(() => UserResult)
  @UseGuards(AtGuard, RolesGuard)
  statisticUser(
    @Args('pagination', { type: () => PaginationInput, nullable: true })
    pagination: PaginationInput,
    @Args('filter', { type: () => FilterStatisticUser, nullable: true })
    filter: FilterStatisticUser,
  ): Promise<UserResult> {
    return this.userHelper.statisticUser(pagination, filter);
  }

  @Query(() => Boolean)
  createMultiUser() {
    try {
      return this.userService.insertManyUser();
    } catch (error) {
      throw error;
    }
  }

  @Query(() => Address)
  @UseGuards(AtGuard)
  getCurrentAddress(@GetUser() user: User): Promise<Address> {
    return this.userHelper.getCurrentAddress(user);
  }

  @Query(() => User)
  @UseGuards(AtGuard)
  getCurrentUser(@GetUser() user: User): User {
    return user;
  }

  @Query(() => UserResult)
  @UseGuards(AtGuard)
  getAllUser(
    @Args('pagination', { type: () => PaginationInput, nullable: true })
    pagination: PaginationInput,
    @Args('filter', { type: () => FilterGetAllUser, nullable: true })
    filter: FilterGetAllUser,
    @GetUser() user: User,
  ): Promise<UserResult> {
    return this.userService.getAllUser(pagination, filter, user);
  }
}
