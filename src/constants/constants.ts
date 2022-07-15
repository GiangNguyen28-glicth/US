import { SortProductEnum, FilterStatistics } from './enum';

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
    Constants.SortOrder[SortProductEnum.LATEST] = {
      property: '$natural',
      option: 1,
      value: {
        code: SortProductEnum.LATEST,
        title: 'Mới nhất',
      },
    };
    Constants.SortOrder[SortProductEnum.DECREASE_PRICE] = {
      property: 'price',
      option: -1,
      value: {
        code: SortProductEnum.DECREASE_PRICE,
        title: 'Giá giảm dần',
      },
    };
    Constants.SortOrder[SortProductEnum.INCREASE_PRICE] = {
      property: 'price',
      option: 1,
      value: {
        code: SortProductEnum.INCREASE_PRICE,
        title: 'Giá tăng dần',
      },
    };
    Constants.SortOrder[SortProductEnum.AZ] = {
      property: 'keyword',
      option: 'asc',
      value: {
        code: SortProductEnum.AZ,
        title: 'Theo bảng chữ cái A-Z',
      },
    };
    Constants.SortOrder[SortProductEnum.ZA] = {
      property: 'keyword',
      option: 'desc',
      value: {
        code: SortProductEnum.ZA,
        title: 'Theo bảng chữ cái Z-A',
      },
    };
    Constants.SortOrder[SortProductEnum.BESTSELLER] = {
      value: {
        code: SortProductEnum.BESTSELLER,
        title: 'Bán chạy nhất',
      },
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
