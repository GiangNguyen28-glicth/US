import { registerEnumType } from '@nestjs/graphql';

export enum GenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  LGBT = 'LGBT',
}
registerEnumType(GenderEnum, {
  name: 'GenderEnum',
});
export enum RoleEnum {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
registerEnumType(RoleEnum, {
  name: 'RoleEnum',
});
export enum RandomCodeEnum {
  LOWER = 'LOWER',
  UPPER = 'UPPER',
  NUMBER = 'NUMBER',
}
registerEnumType(RandomCodeEnum, {
  name: 'RandomCodeEnum',
});
export enum CategoryEnum {
  HOME = 'HOME',
  SPORT = 'SPORT',
}
registerEnumType(CategoryEnum, {
  name: 'CategoryEnum',
});
export enum SortProductEnum {
  LATEST = 'LATEST',
  BESTSELLER = 'BESTSELLER',
  DECREASE_PRICE = 'DECREASE_PRICE',
  INCREASE_PRICE = 'INCREASE_PRICE',
  AZ = 'AZ',
  ZA = 'ZA',
}
registerEnumType(SortProductEnum, {
  name: 'SortProductEnum',
});
export enum FilterStatistics {
  SEVENDAYSAGO = 'SEVENDAYSAGO',
  THIRTYDAYSAGO = 'THIRTYDAYSAGO',
  THISYEAR = 'THISYEAR',
  LASTYEAR = 'LASTYEAR',
}
registerEnumType(FilterStatistics, {
  name: 'FilterStatistics',
});
export enum Permission {
  FULL = 'FULL',

  READ_PRODUCT = 'READ_PRODUCT',
}
registerEnumType(Permission, {
  name: 'Permission',
});
