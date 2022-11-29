import { TagType } from '../../../constants/enum';

export interface ITag extends IEntity {
  name: string;
  type: TagType;
  parentType: TagType;
  description: string;
}
export type ITagCreate = IEntityInput<ITag, null>;
