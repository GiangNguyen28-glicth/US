import { SortOrder } from 'mongoose';
import { SortQuery } from '../constants/constants';
import { RoleEnum, SortOption } from '../constants/enum';
import { transformTextSearch } from './string.utils';
import { setFilterSortOption } from './utils';

export class FilterBuilder<T> {
  public queryFilter: any = {
    $and: [{ isDeleted: false }, { role: RoleEnum.USER }],
  };

  public querySort: SortQuery = {};
  public setFilterItem(key: keyof T, query: any, value: any) {
    if (!key || !value) return this;
    const subQuery = {
      [key]: query,
    };
    this.queryFilter['$and'].push(subQuery);
    return this;
  }

  addName(name: string) {
    name = name?.toLowerCase()?.trim();
    // If search text is empty, limit to using regex
    if (!name) return this;
    this.setFilterItemWithObject(
      'keyword',
      {
        $regex: `${transformTextSearch(name)}`,
        $options: 'i',
      },
      name,
    );
    return this;
  }

  public setFilterItemWithObject(key: string, query: any, value: any) {
    this.setFilterItem(key as keyof T, query, value);
    return this;
  }

  public setSortItem(key: keyof T, value: SortOrder) {
    if (!value) {
      return this;
    }
    this.querySort[key as any] = value;
    return this;
  }

  public addSubQuery(query: object) {
    if (query) this.queryFilter['$and'].push(query);
    return this;
  }

  public addSortOption(input: SortOption) {
    const sortOption = setFilterSortOption(input) as any;
    if (!sortOption) {
      return this;
    }
    this.querySort[sortOption.property] = sortOption.option;
    return this;
  }

  buildQuery() {
    if (!this.queryFilter?.$and?.length) return [{}, this.querySort];
    return [this.queryFilter, this.querySort];
  }
}
