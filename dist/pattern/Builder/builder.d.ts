export interface Builder {
    addRangePrice(minPrice: number, maxPrice: any): Builder;
    addName(name: string): Builder;
    addDiscount(isDiscount: boolean): Builder;
    addProductId(productId: string): Builder;
    buildQuery(): object;
}
