import { SortOrder } from 'mongoose';
import { Constants } from '../../constants/constants';
import { SortProductEnum } from '../../constants/enum';
import { sortQuery } from '../../constants/type';
import { CategoryService } from '../../modules/category/category.service';
import { transformTextSearch } from '../../utils/string.utils';
import { Builder } from './builder';

export class FilterProductBuilder implements Builder {
  public categoryService: CategoryService;
  public queryFilter: any = {
    $and: [],
  };

  public querySort: sortQuery = {};
  addCategoryId(listIdDescendants: string[]): Builder {
    if (listIdDescendants.length === 0) {
      return this;
    }
    this.setFilterItem('category', { $in: listIdDescendants });
    return this;
  }
  addSortOption(input: SortProductEnum): Builder {
    if (!input) {
      return this;
    }
    Constants.generateSortOrder();
    if (input === SortProductEnum.BESTSELLER) {
      return this;
    }
    const { property, option } = Constants.SortOrder[input];
    this.querySort[property] = option as SortOrder;
    return this;
  }
  addProductId(productId: string): Builder {
    if (!productId) {
      return this;
    }
    this.setFilterItem('_id', { $eq: productId });
    return this;
  }
  addDiscount(isDiscount: boolean): Builder {
    if (!isDiscount) {
      return this;
    }
    this.setFilterItem('discount', { $ne: 0 });
    return this;
  }
  addRangePrice(minPrice: number, maxPrice: number): Builder {
    if (!maxPrice) {
      return this;
    }
    this.setFilterItem('price', { $lte: maxPrice, $gte: minPrice });
    return this;
  }
  addName(name: string): Builder {
    name = name?.toLowerCase()?.trim();
    // If search text is empty, limit to using regex
    if (!name) return this;
    this.setFilterItem('keyword', {
      $regex: `${transformTextSearch(name)}`,
      $options: 'i',
    });
    return this;
  }
  buildQuery(): any {
    if (!this.queryFilter?.$and?.length) return [{}, this.querySort];
    return [this.queryFilter, this.querySort];
  }

  public addSubQuery(query: object) {
    if (query) this.queryFilter['$and'].push(query);
    return this;
  }
  public setFilterItem<T>(key: string, value: T) {
    if (!key || !value) return this;
    const query: any = {};
    query[key] = value;
    this.addSubQuery(query);
    return this;
  }
}
