import { PaginationInput } from '../common/dto/common.dto';
import { CreateTagInput, FilterGetAllTag } from './dto/create-tag.input';
import { TagResult } from './entities/tag.entity';
import { TagService } from './tag.service';
export declare class TagResolver {
    private readonly tagService;
    constructor(tagService: TagService);
    createTag(createTagInput: CreateTagInput): Promise<boolean>;
    getAllTag(pagination: PaginationInput, filter: FilterGetAllTag): Promise<TagResult>;
    createMultiTag(): Promise<boolean>;
}
