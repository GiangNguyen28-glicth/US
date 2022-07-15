import { CategoryEnum } from '../../../constants/enum';
import { Category } from '../entites/category.entities';

export interface ICategory extends IEntity {
  code: CategoryEnum;
  name: string;
  parent: Category | string;
  level: number;
  child: Category[];
}
export type ICategoryCreate<ICategory> = Omit<
  ICategory,
  keyof IEntity | 'child'
>;
