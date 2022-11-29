import { SortOrder } from 'mongoose';
import { SortQuery } from '../constants/constants';
import { SortOption } from '../constants/enum';
export declare class FilterBuilder<T> {
    queryFilter: any;
    querySort: SortQuery;
    setFilterItem(key: keyof T, query: any, value: any): this;
    addName(name: string): this;
    setFilterItemWithObject(key: string, query: any, value: any): this;
    setSortItem(key: keyof T, value: SortOrder): this;
    addSubQuery(query: object): this;
    addSortOption(input: SortOption): this;
    buildQuery(): any[];
}
