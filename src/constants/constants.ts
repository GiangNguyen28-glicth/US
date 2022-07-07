import { FilterProduct, FilterStatistics } from './enum';

export class Constants {
  public static LOCALE_COUNTRY_CODE_ENG = 'en';
  public static LOCALE_COUNTRY_CODE_VN = 'vi';
  public static CATEGORY_LEVEL_1 = 1;
  public static CATEGORY_LEVEL_2 = 2;
  public static CATEGORY_LEVEL_3 = 3;
  public static CATEGORY_MAX_LEVEL = 3;
  public static MONTH_12 = 11;
  public static MONTH_1 = 1;
  public static DATE_1 = 1;
  public static DATE_31 = 31;
  public static KEY_PRODUCT_BY_CATEGORY = 'keyproductbycategory';
  public static KEY_DASHBOARD_STATISTIC_ORDER = 'keydashboardstatisticorder';
  public static CLOUDINARY = 'Cloudinary';
  public static SortOrder = {};
  public static StatisticOrder = {};
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
  public static generateStatisticOrder() {
    const today: Date = new Date();
    Constants.StatisticOrder[FilterStatistics.SEVENDAYSAGO] = {
      year: 0,
      month: 0,
      date: 7,
    };
    Constants.StatisticOrder[FilterStatistics.THIRTYDAYSAGO] = {
      year: 0,
      month: 0,
      date: 30,
    };
    Constants.StatisticOrder[FilterStatistics.THISYEAR] = {
      year: 0,
      month: today.getMonth(),
      date: today.getDate() - 1,
    };
    Constants.StatisticOrder[FilterStatistics.LASTYEAR] = {
      year: 1,
      month: today.getMonth(),
      date: today.getDate() - 1,
    };
  }
}
