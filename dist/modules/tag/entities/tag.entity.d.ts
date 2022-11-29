import { TagType } from '../../../constants/enum';
import { ITag } from '../interfaces/tag';
export declare class Tag implements ITag {
    _id: string;
    name: string;
    type: TagType;
    parentType: TagType;
    description: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    slug?: string;
    keyword: string;
}
export declare class TagResult implements IResult<Tag> {
    results: Tag[];
    totalCount: number;
}
