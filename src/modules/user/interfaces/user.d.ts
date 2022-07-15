import { GenderEnum, RoleEnum } from '../../../constants/enum';

export interface IUser extends IEntity {
  username?: string;
  email?: string;
  password?: string;
  phonenumber?: string;
  gender?: GenderEnum;
  address?: string;
  role?: RoleEnum;
  isEmailConfirmed?: boolean;
  isExprise?: Date;
  currentHashedRefreshToken?: string;
  resetPasswordCode: string;
}
export type IUserUpdate = IEntityUpdate<IUser>;
export type IUserCreate<IUser> = Omit<
  IUser,
  | keyof IEntity
  | 'isExprise'
  | 'resetPasswordCode'
  | 'isEmailConfirmed'
  | 'currentHashedRefreshToken'
>;
