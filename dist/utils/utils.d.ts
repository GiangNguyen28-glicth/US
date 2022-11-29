import { FilterByDate, SortOption } from '../constants/enum';
export declare function includesInObject<T>(array: Array<T>, key1: keyof T, key2: string, condition: any): boolean;
export declare function setFilterByDate(filterByDate: FilterByDate): any;
export declare function setFilterSortOption(sortOption: SortOption): {};
export declare function randomCode(): number;
export declare function setLastDate(endOfDateConvert: Date): Date;
export declare function setStartDate(startOfDate: Date): Date;
