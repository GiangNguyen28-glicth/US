import { SortProductEnum } from '../../constants/enum';
import { sortQuery } from '../../constants/type';
import { Builder } from './builder';
export declare class FilterProductBuilder implements Builder {
    queryFilter: any;
    querySort: sortQuery;
    addSortOption(input: SortProductEnum): Builder;
    addProductId(productId: string): Builder;
    addDiscount(isDiscount: boolean): Builder;
    addRangePrice(minPrice: number, maxPrice: number): Builder;
    addName(name: string): Builder;
    buildQuery(): any;
    addSubQuery(query: object): this;
    setFilterItem<T>(key: string, value: T): this;
}
