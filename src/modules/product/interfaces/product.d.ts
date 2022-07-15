import { Types } from 'mongoose';
import { Category } from 'modules/category/entites/category.entities';

export interface IProduct extends IEntity {
  name: string;
  price: Types.Decimal128 | number;
  rating: number;
  title: string;
  discount: number;
  originalPrice: Types.Decimal128 | number;
  quantity: number;
  imgUrl: string[];
  category: Category | string;
  displayPrice: string;
}

export type IProductUpdate = IEntityUpdate<IProduct>;
export type ICreateProduct<IProduct> = Omit<
  IProduct,
  keyof IEntity | 'displayPrice' | 'originalPrice' | 'rating'
>;
