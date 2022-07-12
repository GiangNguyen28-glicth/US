import { transformTextSearch } from '../../utils/string.utils';
import { Builder } from './builder';

export class FilterProductBuilder implements Builder {
  public query: any = {
    $and: [],
  };
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
  buildQuery(): object {
    if (!this.query?.$and?.length) return {};
    return this.query;
  }

  public addSubQuery(query: object) {
    if (query) this.query['$and'].push(query);
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
