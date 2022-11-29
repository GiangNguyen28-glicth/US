import { Types } from 'mongoose';

type IPopulateSelect<T> = (keyof T | `-${Extract<keyof T, string>}`)[];
type IRefOption<T> =
  | { autoPopulate: true; select: IPopulateSelect<T> }
  | { autoPopulate: false; readonly select?: false };
export const ref = <T>(Entity: new () => T, option: IRefOption<T>) => {
  const { autoPopulate = false, select = null } = option || {};
  return {
    type: Types.ObjectId,
    ref: Entity.name,
    default: null,
    autoPopulate: autoPopulate ? { select } : false,
  };
};
