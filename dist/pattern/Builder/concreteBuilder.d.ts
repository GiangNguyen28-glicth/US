import { SortProductEnum } from '../../constants/enum';
import { sortQuery } from '../../constants/type';
import { CategoryService } from '../../modules/category/category.service';
import { Builder } from './builder';
export declare class FilterProductBuilder implements Builder {
    categoryService: CategoryService;
    queryFilter: any;
    querySort: sortQuery;
    addCategoryId(listIdDescendants: string[]): Builder;
    addSortOption(input: SortProductEnum, listProductID: string[]): Builder;
    addProductId(productId: string): Builder;
    addDiscount(isDiscount: boolean): Builder;
    addRangePrice(minPrice: number, maxPrice: number): Builder;
    addName(name: string): Builder;
    buildQuery(): any;
    addSubQuery(query: object): this;
    setFilterItem<T>(key: string, value: T): this;
}
