import { FilterByDate, SortOption } from '../constants/enum';

export function includesInObject<T>(
  array: Array<T>,
  key1: keyof T,
  key2: string,
  condition,
): boolean {
  return array.filter(item => {
    if (item[key1][key2].toString() === condition) {
      return item;
    }
  }).length > 0
    ? true
    : false;
}

export function setFilterByDate(filterByDate: FilterByDate) {
  if (!filterByDate) {
    return null;
  }
  const currentDate: Date = new Date();
  const filterDate = {
    SEVEN_DAYS_AGO: {
      $gte: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDay() - 7,
      ),
      $lte: currentDate,
    },
    THIRTY_DAYS_AGO: {
      $gte: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        currentDate.getDay(),
      ),
      $lte: currentDate,
    },
    THIS_YEAR: {
      $gte: new Date(currentDate.getFullYear(), 1, 1),
      $lte: currentDate,
    },
  };
  return { ...filterDate[filterByDate] };
}

export function setFilterSortOption(sortOption: SortOption) {
  if (!sortOption) {
    return {};
  }
  const sortFilter = {
    AZ: { property: 'keyword', option: 'asc' },
    ZA: { property: 'keyword', option: 'desc' },
    AGE: { property: 'age', option: 1 },
  };
  return { ...sortFilter[sortOption] };
}

export function randomCode(): number {
  return +(Math.random() * (999999 - 100000) + 100000).toFixed(0);
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
