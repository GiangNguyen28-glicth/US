import { TagType } from '../../../constants/enum';
import { ITag, ITagCreate } from '../interfaces/tag';
export declare class CreateTagInput implements ITagCreate {
    name: string;
    type: TagType;
    parentType: TagType;
    description: string;
}
export declare class FilterGetAllTag implements Partial<ITag> {
    name: string;
    type?: TagType;
    parentType?: TagType;
    ids: string[];
}
