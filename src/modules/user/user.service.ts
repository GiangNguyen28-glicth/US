import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  LoginInput,
  RegisterInput,
  ResetPasswordInput,
} from '../../auth/dto/auth.input';
import { getFieldsInFilter } from '../../utils/feature.utils';
import { FilterGetOneUser, UpdateUserInput } from './dto/user.input';
import { User } from './entities/user.entities';
import { UserDocument } from './schema/user.schema';
import * as bcrypt from 'bcrypt';
import { Permission, RoleEnum } from '../../constants/enum';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async getOne(filter: FilterGetOneUser): Promise<UserDocument | undefined> {
    let query;
    if (filter?.custom) {
      query = getFieldsInFilter(filter);
    }
    query = filter;
    const user: UserDocument = await this.userModel.findOne(query).exec();
    if (!user) {
      return undefined;
    }
    return user;
  }
  async signUp(input: RegisterInput): Promise<User> {
    const password = input.password;
    const user = new this.userModel(input);
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    user.role = RoleEnum.USER;
    user.permission = [Permission.FULL, Permission.READ_PRODUCT];
    user.password = hashPassword;
    await user.save();
    return user;
  }
  async markEmailAsConfirmed(email: string): Promise<User> {
    return this.userModel.findOneAndUpdate(
      { email: email },
      {
        isEmailConfirmed: true,
        isExprise: null,
      },
    );
  }
  async login(loginInput: LoginInput): Promise<UserDocument> {
    const { email, password } = loginInput;
    const user = await this.userModel.findOne({ email });
    if (!user || !(await this.isCorrectPassword(password, user))) {
      throw new HttpException(
        'Tài khoản hoặc mật khẩu không chính xác',
        HttpStatus.UNAUTHORIZED,
      );
    }
    if (!user.isEmailConfirmed) {
      throw new HttpException(
        'Vui lòng xác thực tài khoản Email',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }
  async isCorrectPassword(password: string, user: User): Promise<boolean> {
    if (user && (await bcrypt.compare(password, user.password))) {
      return true;
    }
    return false;
  }
  async generateResetCode(user: User, randomString: string): Promise<void> {
    const userUpdate = new this.userModel(user);
    userUpdate.resetPasswordCode = await bcrypt.hash(randomString, 12);
    await userUpdate.save();
  }
  async verifyResetpassword(input: ResetPasswordInput): Promise<boolean> {
    const { code, userId, password, confirmpassword } = input;
    const user = await this.userModel.findOne({ _id: userId });
    if (!user) {
      throw new HttpException('User không tồn tại', HttpStatus.NOT_FOUND);
    }
    if (!user.isEmailConfirmed) {
      throw new HttpException(
        'Email chưa được xác thực',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!(await bcrypt.compare(code, user.resetPasswordCode))) {
      throw new HttpException('Code không chính xác', HttpStatus.BAD_REQUEST);
    }
    if (password != confirmpassword) {
      throw new HttpException('Mật khâu không khớp', HttpStatus.BAD_REQUEST);
    }
    user.resetPasswordCode = null;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    user.password = hashPassword;
    await user.save();
    return true;
  }

  async updateUser(input: UpdateUserInput, _id: string): Promise<User> {
    const user: UserDocument = await this.userModel.findOneAndUpdate(
      { _id },
      input,
      { new: true },
    );
    if (!user) {
      throw new HttpException('User không tồn tại', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  async checkUserExists(userId: string): Promise<boolean> {
    const user = await this.userModel.findOne({ _id: userId });
    if (!user) {
      return false;
    }
    return true;
  }

  async getUserByDate(startOfDate: string, endOfDate: string): Promise<User[]> {
    const user = await this.userModel.find({
      createAt: {
        $gte: startOfDate,
        $lte: endOfDate,
      },
    });
    return user;
  }
}
