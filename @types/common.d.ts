interface IResult<T> {
  results: T[];
  totalCount: number;
}

interface IEntity {
  _id?: string;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  slug?: string;
  keyword?: string;
}

type IOmitEntity<T> = Omit<T, keyof IEntity>;
type IEntityInput<T, V extends keyof IOmitEntity<T> | null> = Omit<
  IOmitEntity<T>,
  V | null
>;
