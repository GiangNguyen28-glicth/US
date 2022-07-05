import { FilterProduct } from './enum';

export class Constants {
  public static LOCALE_COUNTRY_CODE_ENG = 'en';
  public static LOCALE_COUNTRY_CODE_VN = 'vi';
  public static CATEGORY_LEVEL_1 = 1;
  public static CATEGORY_LEVEL_2 = 2;
  public static CATEGORY_LEVEL_3 = 3;
  public static CATEGORY_MAX_LEVEL = 3;
  public static KEY_PRODUCT_BY_CATEGORY = 'keyproductbycategory';
  public static CLOUDINARY = 'Cloudinary';
  public static SortOrder = {};
  public static generateSortOrder() {
    Constants.SortOrder[FilterProduct.LATEST] = {
      property: '$natural',
      option: 1,
    };
    Constants.SortOrder[FilterProduct.DECREASE_PRICE] = {
      property: 'price',
      option: -1,
    };
    Constants.SortOrder[FilterProduct.INCREASE_PRICE] = {
      property: 'price',
      option: 1,
    };
    Constants.SortOrder[FilterProduct.AZ] = {
      property: 'keyword',
      option: 'asc',
    };
    Constants.SortOrder[FilterProduct.ZA] = {
      property: 'keyword',
      option: 'desc',
    };
  }
}
