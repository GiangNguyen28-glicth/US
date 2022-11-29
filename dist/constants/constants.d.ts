import { SortOrder } from 'mongoose';
export declare class Constants {
    static LOCALE_COUNTRY_CODE_ENG: string;
    static LOCALE_COUNTRY_CODE_VN: string;
    static UPDATE_PROFILE: string;
    static CHANGE_SETTING: string;
    static REFRESH_TOKEN_TTL: number;
    static SOCKET_ID_TTL: number;
    static TTL_RESET_CODE_PASSWORD: number;
    static TTL_CODE_DELETE_ACCOUNT: number;
    static MESSAGE_HAS_DELETED: string;
    static MAX_COUNT_IN_USER_EMBEDDED: number;
    static BEARER_TOKEN: string;
    static SOCKET: string;
    static DEFAULT_DISTANCE: number;
    static VERIFY_ACCOUNT_SUBJECT: string;
    static VERIFY_ACCOUNT_CODE: string;
    static RESET_CODE_DELETE_ACCOUNT: string;
    static RESET_CODE_PASSWORD: string;
    static CLOUDINARY: string;
    static EXCLUDE_FIELDS: string;
}
export type SortQuery = {
    [key: string]: SortOrder;
};
