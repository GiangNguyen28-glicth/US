import { HttpException, HttpStatus } from '@nestjs/common';
import { Schema, Types } from 'mongoose';
import { Constants } from '../constants/constants';
import { FilterStatistics } from '../constants/enum';
import { transformTextSearch } from './string.utils';

// eslint-disable-next-line @typescript-eslint/ban-types
export function getFieldsInFilter(filter: Object): Object {
  const fields = {};
  for (const key in filter) {
    if (!isUndefinedOrNull(key)) {
      if (Array.isArray(filter[key])) {
        fields[key] = { $in: filter[key] };
      } else {
        fields[key] = filter[key];
      }
    }
  }
  return fields;
}
export function isUndefinedOrNull(val: any): boolean {
  return val === undefined || val === null;
}
export function toKeyword(text: string): string {
  if (!text) return '';
  return text.replace(/-/g, ' ');
}
export function getQueryGetAll(
  prop: string,
  searchInput: string,
  // eslint-disable-next-line @typescript-eslint/ban-types
  fields?: Object,
) {
  const query: any = {
    $and: [
      {
        property: {
          $regex: `${transformTextSearch(searchInput)}`,
          $options: 'i',
        },
      },
    ],
  };
  Object.defineProperty(
    query.$and[0],
    prop,
    Object.getOwnPropertyDescriptor(query.$and[0], 'property'),
  );

  delete query.$and[0]['property'];
  if (!isEmptyObject(fields)) {
    query.$and.push(fields);
  }
  return query;
}
// eslint-disable-next-line @typescript-eslint/ban-types
export function isEmptyObject(obj: Object): boolean {
  for (const key in obj) {
    return false;
  }
  return true;
}
// eslint-disable-next-line @typescript-eslint/ban-types
export function setInputForOldDocument(input: Object, oldDoc: Object): void {
  if (!oldDoc) {
    throw new HttpException('Không tìm thấy Document', HttpStatus.NOT_FOUND);
  }

  for (const key in input) {
    if (!isUndefinedOrNull(input[key])) {
      oldDoc[key] = input[key];
    }
  }
}
export function toformatPrice(price: Types.Decimal128): string {
  const priceN = parseInt(price.toString());
  const priceVND = priceN.toLocaleString('it-IT', {
    style: 'currency',
    currency: 'VND',
  });
  return priceVND;
}
export function statisticFormatDateToString(
  staticOption: string,
): [string, string] {
  const { year, month, date } = Constants.StatisticOrder[staticOption];
  const temp: Date = new Date();
  const endDate: Date = new Date(
    temp.getFullYear(),
    temp.getMonth(),
    temp.getDate(),
    7,
  );
  if (staticOption === FilterStatistics.LASTYEAR) {
    endDate.setFullYear(temp.getFullYear() - 1);
    endDate.setMonth(Constants.MONTH_12);
    endDate.setDate(Constants.DATE_31);
  }
  const endOfDate: string = endDate.toISOString().substring(0, 10);
  const startDate: Date = new Date(
    temp.getFullYear() - year,
    temp.getMonth() - month,
    temp.getDate() - date,
    7,
  );
  const startOfDate: string = startDate.toISOString().substring(0, 10);
  return [startOfDate, endOfDate];
}
export function convertDecimal128ToString(
  val: Schema.Types.Decimal128,
): number {
  if (val) {
    return +val.toString();
  }
  return 0;
}
export function setLastDate(endOfDateConvert: Date): Date {
  endOfDateConvert.setHours(23);
  endOfDateConvert.setMinutes(59);
  endOfDateConvert.setSeconds(59);
  endOfDateConvert.setMilliseconds(59);
  return endOfDateConvert;
}
export function setStartDate(startOfDate: Date): Date {
  startOfDate.setHours(0);
  startOfDate.setMinutes(0);
  startOfDate.setSeconds(0);
  startOfDate.setMilliseconds(0);
  return startOfDate;
}

export function getSkipValue(page: number, size: number): number | undefined {
  if (!page || !size) {
    return undefined;
  }
  return (page - 1) * size;
}

export function priceAfterDiscount(
  price: number | Types.Decimal128,
  discount: number,
): number | Types.Decimal128 {
  if (!discount || discount === 0) {
    return price;
  }
  price = (price as number) - (price as number) * (discount / 100);
  return price;
}
