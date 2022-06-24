import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginInput, RegisterInput } from '../../auth/dto/auth.input';
import { getFieldsInFilter } from '../../utils/feature.utils';
import { FilterGetOneUser } from './dto/user.input';
import { User } from './entities/user.entities';
import { UserDocument } from './schema/user.schema';
import * as bcrypt from 'bcrypt';
import { RoleEnum } from '../../constants/enum';
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
    user.password = hashPassword;
    await user.save();
    return user;
  }
  async markEmailAsConfirmed(email: string): Promise<User> {
    return this.userModel.findOneAndUpdate(
      { email: email },
      {
        isEmailConfirmed: true,
      },
    );
  }
  async login(loginInput: LoginInput): Promise<UserDocument> {
    const { email, password } = loginInput;
    const user = await this.userModel.findOne({ email });
    if (!user.isEmailConfirmed) {
      throw new HttpException(
        'Vui lòng xác thực tài khoản Email',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!(await this.isCorrectPassword(password, user))) {
      throw new HttpException(
        'Tài khoản hoặc mật khẩu không chính xác',
        HttpStatus.UNAUTHORIZED,
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
}
