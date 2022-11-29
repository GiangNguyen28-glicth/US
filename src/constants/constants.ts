import { SortOrder } from 'mongoose';

export class Constants {
  public static LOCALE_COUNTRY_CODE_ENG = 'en';
  public static LOCALE_COUNTRY_CODE_VN = 'vi';
  public static UPDATE_PROFILE = 'update_profile';
  public static CHANGE_SETTING = 'mySetting';
  public static REFRESH_TOKEN_TTL = 365 * 24 * 60 * 60;
  public static SOCKET_ID_TTL = 7 * 24 * 60 * 60;
  public static TTL_RESET_CODE_PASSWORD = 60 * 15;
  public static TTL_CODE_DELETE_ACCOUNT = 60 * 15;
  public static MESSAGE_HAS_DELETED = 'Tin nhắn đã được thu hồi !';
  public static MAX_COUNT_IN_USER_EMBEDDED = 999999;
  public static BEARER_TOKEN = 'Bearer ';
  public static SOCKET = 'Socket';
  public static DEFAULT_DISTANCE = 1000000000000;
  public static VERIFY_ACCOUNT_SUBJECT = 'Verify your account';
  public static VERIFY_ACCOUNT_CODE = 'Verify_your_code';
  public static RESET_CODE_DELETE_ACCOUNT = 'reset_code_delete_account';
  public static RESET_CODE_PASSWORD = 'reset_code_password';
  public static CLOUDINARY = 'Cloudinary';
  public static EXCLUDE_FIELDS = '-password';
}
export type SortQuery = { [key: string]: SortOrder };
