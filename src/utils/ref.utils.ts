import { Schema } from 'mongoose';

type IPopulateSelect<T> = (keyof T | `-${Extract<keyof T, string>}`)[];

type IRefOption<T> =
  | {
      autoPopulate?: true;
      /**  If you dont' set for this field, this will populate all */
      select?: IPopulateSelect<T>;
    }
  | {
      autoPopulate: false;
      readonly select?: null;
    };

export const ref = <T>(
  Entity: new () => T, // Generic class type
  option?: IRefOption<T>,
) => {
  const { autoPopulate = true, select = null } = option || {};

  return {
    type: Schema.Types.ObjectId,
    ref: Entity.name,
    default: null,
    autopopulate: autoPopulate ? { select } : false,
  };
};
