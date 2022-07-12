import { Builder } from './builder';
export declare class FilterProductBuilder implements Builder {
    query: any;
    addProductId(productId: string): Builder;
    addDiscount(isDiscount: boolean): Builder;
    addRangePrice(minPrice: number, maxPrice: number): Builder;
    addName(name: string): Builder;
    buildQuery(): object;
    addSubQuery(query: object): this;
    setFilterItem<T>(key: string, value: T): this;
}
