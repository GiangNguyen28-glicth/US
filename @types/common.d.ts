interface IResultFilter<T> {
  results: T[];
  totalCount: number;
}

interface IEntity {
  _id: string;
  createAt: Date;
  updateAt: Date;
  slug?: string;
  keyword: string;
}

type IEntityUpdate<T> = Omit<T, keyof IEntity>;
