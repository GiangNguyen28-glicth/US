import slugify from 'slugify';
import { Constants } from '../constants/constants';
import { RandomCodeEnum } from '../constants/enum';
export function randomCode(length: number, option?: RandomCodeEnum): string {
  let alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (option && option === RandomCodeEnum.LOWER) {
    alphabet = '0123456789abcdefghjklmnopqrstuvwxyz';
  }
  if (option && option === RandomCodeEnum.NUMBER) {
    alphabet = '0123456789';
  }
  return alphabet;
}
export function toSlug(text: string, locale?: string): string {
  if (!text) return '';
  text = text.replace('$', '').replace('%', '');
  if (!locale) {
    locale = Constants.LOCALE_COUNTRY_CODE_ENG;
  } else {
    locale = Constants.LOCALE_COUNTRY_CODE_VN;
  }
  return slugify(text, {
    replacement: '-',
    lower: true,
    strict: true,
    locale: locale,
    trim: true,
  });
}
export function toKeyword(text: string): string {
  if (!text) return '';
  return text.replace(/-/g, ' ');
}
export function transformTextSearch(text: string): string {
  if (!text) return '';
  text = text.replace('$', '').replace('%', '');
  text = slugify(text, {
    replacement: '-',
    lower: true,
    strict: true,
    trim: true,
  });
  return text.replace(/-/g, ' ');
}
