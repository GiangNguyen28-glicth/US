import {
  BadRequestException,
  CACHE_MANAGER,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import bcrypt from 'bcrypt';
import { Cache } from 'cache-manager';
import { ChatGateway } from 'modules/socket/chat.gateway';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { LoginInput, RegisterInput } from '../../auth/dto/auth.dto';
import { Constants } from '../../constants/constants';
import { throwIfNotExists } from '../../utils/model.utils';
import { includesInObject } from '../../utils/utils';
import { PaginationInput } from '../common/dto/common.dto';
import { ConversationService } from '../conversation/conversation.service';
import { LoggerService } from '../logger/logger.service';
import { UserEmbeddedService } from '../user_embedded/user_embedded.service';
import {
  FilterGetAllUser,
  FilterGetOneUser,
  MySettingInput,
  UpdateUserInput,
} from './dto/create-user.dto';
import {
  GeoLocation,
  MatchRequest,
  User,
  UserResult,
} from './entities/user.entities';
import { UserHelper } from './helper/user.helper';
import { UserModelType } from './schema/user.schema';
import { mappingData } from '../../pattern/mapping.tinder';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: UserModelType,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject(forwardRef(() => ChatGateway))
    private chatGateway: ChatGateway,
    private userEmbeddedService: UserEmbeddedService,
    private loggerService: LoggerService,
    private conversationService: ConversationService,
    private userHelper: UserHelper,
  ) {
    this.loggerService.setContext('UserService');
  }
  async createWithOAuth2(userGoogle: User): Promise<User> {
    try {
      const user = await this.userModel.create(userGoogle);
      return await user.save();
    } catch (error) {
      throw error;
    }
  }

  async changePassword(
    oldPassword: string,
    newPassword: string,
    user: User,
  ): Promise<boolean> {
    try {
      await this.isNotCorrectPassword(oldPassword, user.password);
      const hashPassword = await this.hashPassword(newPassword);
      const newUser = await this.userModel.findOneAndUpdate(
        { _id: user._id },
        { $set: { password: hashPassword } },
      );
      return newUser ? true : false;
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(user: User, password: string): Promise<boolean> {
    try {
      const newUser = new this.userModel(user);
      newUser.password = password;
      return (await newUser.save()) ? true : false;
    } catch (error) {
      throw error;
    }
  }

  async findOne(filter: FilterGetOneUser): Promise<User> {
    try {
      const user = await this.userModel
        .findOne(filter)
        .select(Constants.EXCLUDE_FIELDS);
      throwIfNotExists(user, 'Không tìm thấy User tương ứng');
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getOne(filter: FilterGetOneUser): Promise<User | undefined> {
    try {
      const user = await this.userModel.findOne(filter);
      return user ? user : undefined;
    } catch (error) {
      throw error;
    }
  }

  async getAllUser(
    pagination: PaginationInput,
    filter: FilterGetAllUser,
    user: User,
  ): Promise<UserResult> {
    try {
      let maxDistance = user.mySetting.discovery.distance * 1000; //1
      const queryFilter = await this.userHelper.buildQueryWithUser(
        user,
        filter,
      ); //12
      if (user.mySetting.discovery.onlyShowDistanceThisRange === false) {
        //13
        maxDistance = Constants.DEFAULT_DISTANCE; //14
        this.loggerService.debug(`MaxDistance:${maxDistance}`); //15
      }
      const [results, totalCount] = await Promise.all([
        //16 //17
        this.userModel.aggregate([
          {
            $geoNear: {
              near: {
                type: 'Point',
                coordinates: [
                  user.geoLocation.coordinates[0], //18
                  user.geoLocation.coordinates[1],
                ],
              },
              spherical: true,
              distanceField: 'calcDistance',
              maxDistance: maxDistance,
              query: queryFilter, //19
            },
          },
          {
            $project: {
              mySetting: 0,
              matchRequest: 0,
              __v: 0,
              geoLocation: 0,
              reports: 0,
            },
          },
          {
            $sort: { maxDistance: 1 },
          },
          {
            $skip: (pagination?.page - 1) * pagination?.size || 0, //20 21
          },
          {
            $limit: pagination?.size || 100, // 22 23
          },
        ]),
        this.userModel.aggregate([
          //24
          {
            $geoNear: {
              near: {
                type: 'Point',
                coordinates: [
                  user.geoLocation.coordinates[0],
                  user.geoLocation.coordinates[1], //25
                ],
              },
              spherical: true,
              distanceField: 'calcDistance',
              maxDistance: maxDistance,
              query: queryFilter, //26
            },
          },
        ]),
      ]);
      return { results, totalCount: totalCount.length }; //27
    } catch (error) {
      // 28
      throw error; //29
    }
  }

  async signIn(input: LoginInput): Promise<User> {
    try {
      const user = await this.getOne({ email: input.email });
      throwIfNotExists(user, 'Tài khoản không chính xác');
      if (!user.isConfirmMail) {
        throw new UnauthorizedException(
          'Email chưa được xác nhận. Vui lòng xác nhận email của bạn',
        );
      }
      if (user.isBlocked) {
        throw new UnauthorizedException(
          'Tài khoản của bạn đã bị khóa. Vui lòng nạp tiền để mở khóa',
        );
      }
      await this.isNotCorrectPassword(input.password, user.password);
      if (!user.isConfirmMail) {
        throw new UnauthorizedException(
          'Tài khoản của bạn chưa được xác thực email. Vui lòng xác thực email để tiếp tục',
        );
      }
      this.loggerService.debug('Passed password');
      return user;
    } catch (error) {
      throw error;
    }
  }

  async signInAsAdmin(email: string, password: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({ email });
      throwIfNotExists(user, 'Admin không tồn tại');
      await this.isNotCorrectPassword(password, user.password);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async signUp(register: RegisterInput): Promise<User> {
    try {
      if (register.password != register.confirmPassword) {
        throw new BadRequestException('Mật khẩu không khớp');
      }
      const { password, email } = register;
      const userExisting = await this.getOne({ email });
      if (userExisting) {
        throw new BadRequestException('Email đã tồn tại');
      }
      const [user, hashPassword] = await Promise.all([
        this.userModel.create({ email }),
        this.hashPassword(password),
      ]);
      user.password = hashPassword;
      return user.save();
    } catch (error) {
      throw error;
    }
  }

  async hashPassword(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);
      return hashPassword;
    } catch (error) {
      throw error;
    }
  }

  async isNotCorrectPassword(
    password: string,
    currentPassword: string,
  ): Promise<void> {
    const correct = await bcrypt.compare(password, currentPassword);
    if (!correct) {
      throw new UnauthorizedException('Mật khẩu không chính xác');
    }
  }

  async findOneAndUpdate(
    filter: FilterQuery<User>,
    update: UpdateQuery<User>,
  ): Promise<User> {
    try {
      const user = await this.userModel.findOneAndUpdate(filter, update, {
        new: true,
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateProfile(
    user: User,
    input: UpdateUserInput | MySettingInput,
    feature: string,
  ): Promise<boolean> {
    try {
      //1
      let updateQuery = {}; //2
      if (feature === Constants.CHANGE_SETTING) {
        //3
        updateQuery[feature] = input; //4
      } else {
        updateQuery = { ...input }; //5
      }
      const newUser = await this.userModel.findOneAndUpdate(
        //6
        { _id: user._id },
        { $set: updateQuery },
        { new: true },
      );
      return (await newUser.save()) ? true : false; //7 //8 //9
    } catch (error) {
      //10
      throw error; //11
    }
  }

  async skipUser(user: User, user_id: string): Promise<boolean> {
    try {
      await this.userEmbeddedService.findOneAndUpdate(
        {
          user: user._id,
          countUnlike: { $lt: Constants.MAX_COUNT_IN_USER_EMBEDDED },
        },
        {
          $push: { unlikeUser: user_id },
          $inc: { countUnlike: 1 },
          $set: { user: user._id },
        },
        { upsert: true, new: true },
      );
      return true;
    } catch (error) {
      throw error;
    }
  }

  async unSkipUser(user: User, user_id: string): Promise<boolean> {
    try {
      const user_embedded = await this.userEmbeddedService.getCurrentEmbedded(
        user._id,
      );
      await this.userEmbeddedService.findOneAndUpdate(
        {
          _id: user_embedded._id,
        },
        { $pull: { unlikeUser: { $eq: user_id } }, $inc: { countUnlike: -1 } },
        { new: true },
      );
      return true;
    } catch (error) {
      throw error;
    }
  }

  async matchedUser(
    user: User,
    user_id: string,
    requestedUser: User,
  ): Promise<void> {
    this.loggerService.log('User match request with request user');
    const members = [user._id.toString(), requestedUser._id.toString()];
    const query = this.conversationService.getQueryOrMembers(members);
    await Promise.all([
      this.conversationService.findOneAndUpdate(
        query,
        { $set: { members: members, isDeleted: false } },
        { upsert: true },
      ),
      this.userModel.findOneAndUpdate(
        { _id: user._id },
        {
          $pull: { matchRequest: { sender: user_id } },
          $push: { matched: requestedUser },
        },
      ),
      requestedUser.matched.push(user),
    ]);
  }

  async likeUser(user_id: string, user: User): Promise<boolean> {
    try {
      const requestedUser = await this.userModel.findOne({ _id: user_id }); // user được yêu cầu
      const isContainsInRequest = includesInObject<MatchRequest>(
        user.matchRequest,
        'sender',
        '_id',
        user_id,
      );
      if (isContainsInRequest) {
        const [, socketIds] = await Promise.all([
          this.matchedUser(user, user_id, requestedUser),
          this.cacheManager.get(
            Constants.SOCKET + requestedUser._id.toString(),
          ),
        ]);
        this.chatGateway.sendEmit(socketIds, 'matchedUser', user);
      } else {
        this.loggerService.log(
          `Request match request to ${requestedUser.username}`,
        );
        requestedUser.matchRequest.push({
          sender: user,
          createdAt: new Date(),
        });
        const [, socketIds] = await Promise.all([
          this.userEmbeddedService.findOneAndUpdate(
            {
              user: user._id,
              countLike: { $lt: Constants.MAX_COUNT_IN_USER_EMBEDDED },
            },
            {
              $push: { like: user_id },
              $inc: { countLike: 1 },
              $set: { user: user._id },
            },
            { upsert: true, new: true },
          ),
          this.cacheManager.get(
            Constants.SOCKET + requestedUser._id.toString(),
          ),
        ]);
        this.chatGateway.sendEmit(socketIds, 'matchRequest', user);
      }
      await requestedUser.save();
      return true;
    } catch (error) {
      throw error;
    }
  }

  async unlikeUser(user: User, user_id: string): Promise<boolean> {
    const userUpdated = await this.userModel.findOneAndUpdate(
      { _id: user_id, matchRequest: { $elemMatch: { sender: user._id } } },
      { $pull: { matchRequest: { sender: user._id } } },
    );
    if (!userUpdated) {
      const members = [user._id.toString(), user_id];
      const query = this.conversationService.getQueryOrMembers(members);
      await Promise.all([
        this.userModel.findOneAndUpdate(
          { _id: user_id },
          {
            $pull: { matched: { $eq: user._id } },
          },
        ),
        this.userModel.findOneAndUpdate(
          { _id: user._id },
          {
            $pull: { matched: { $eq: user_id } },
            $push: { matchRequest: { sender: user_id, createdAt: new Date() } },
          },
        ),
        this.conversationService.findOneAndUpdate(query, {
          $set: { isDeleted: true },
        }),
      ]);
      return true;
    }
    return userUpdated ? true : false;
  }

  async unMatched(user: User, user_id: string): Promise<boolean> {
    try {
      const members = [user._id.toString(), user_id];
      const query = this.conversationService.getQueryOrMembers(members);
      await Promise.all([
        this.userModel.findOneAndUpdate(
          { _id: user_id },
          { $pull: { matched: user._id } },
        ),
        this.userModel.findOneAndUpdate(
          { _id: user._id },
          { $pull: { matched: user_id } },
        ),
        this.conversationService.findOneAndUpdate(query, {
          $set: { isDeleted: false },
        }),
      ]);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async reportUser(
    reasonReport: string,
    descriptionReport: string,
    userReport: string,
    reportBy: User,
  ): Promise<boolean> {
    try {
      const user = await this.userModel.findOneAndUpdate(
        { _id: userReport },
        { $push: { reports: { reportBy, reasonReport, descriptionReport } } },
      );
      throwIfNotExists(user, 'Tài khoản không tồn tại');
      const user_embedded = await this.userEmbeddedService.findOneAndUpdate(
        { _id: reportBy._id },
        { $push: { unlikeUser: userReport } },
        { upsert: true, new: true },
      );
      return user && user_embedded ? true : false;
    } catch (error) {
      throw error;
    }
  }
  async insertManyUser(): Promise<boolean> {
    try {
      // const users = mappingData();
      // const usersL = await this.userModel.insertMany(users);
      const usersL = await this.userModel.find();
      let count = 17;
      for (const user of usersL) {
        // if (user.email === undefined) {
        //   user.email = `user${count}@gmail.com`;
        //   user.password = await this.hashPassword('1');
        //   user.isConfirmMail = true;
        // }
        user.geoLocation = new GeoLocation();
        user.geoLocation.coordinates = [106.7116815, 10.821203];
        await user.save();
        count++;
      }
      return true;
    } catch (error) {
      throw error;
    }
  }
}
