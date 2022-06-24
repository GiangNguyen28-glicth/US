import { User } from '../entities/user.entities';
import { Document, Schema } from 'mongoose';
import { GenderEnum, RoleEnum } from '../../../constants/enum';
export type UserDocument = User & Document;
export const UserSchema = new Schema<User>({
  username: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
  },
  phonenumber: {
    type: String,
    trim: true,
  },
  gender: {
    type: String,
    enum: Object.values(GenderEnum),
  },
  address: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    enum: Object.values(RoleEnum),
  },
  isEmailConfirmed: {
    type: Boolean,
    default: false,
  },
  isExprise: {
    type: Date,
    default: Date.now(),
    expires: 60 * 60 * 5,
  },
  currentHashedRefreshToken: {
    type: String,
    trim: true,
  },
  keyword: {
    type: String,
    trim: true,
  },
  slug: {
    type: String,
    trim: true,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  updateAt: {
    type: Date,
  },
});
