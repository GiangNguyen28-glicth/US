import { RandomCodeEnum } from '../constants/enum';
export declare function randomCode(length: number, option?: RandomCodeEnum): string;
export declare function toSlug(text: string, locale?: string): string;
export declare function toKeyword(text: string): string;
export declare function transformTextSearch(text: string): string;
