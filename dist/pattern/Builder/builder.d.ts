import { SortProductEnum } from '../../constants/enum';
export interface Builder {
    addRangePrice(minPrice: number, maxPrice: number): Builder;
    addName(name: string): Builder;
    addDiscount(isDiscount: boolean): Builder;
    addProductId(productId: string): Builder;
    addCategoryId(listIdDescendants: string[]): Builder;
    addSortOption(az: SortProductEnum, listProductID?: string[]): Builder;
    buildQuery(): any;
}
