import { PaginationInput } from '../common/dto/common.dto';
import { CreateTagInput, FilterGetAllTag } from './dto/create-tag.input';
import { TagResult } from './entities/tag.entity';
import { TagModelType } from './schema/tag.schema';
export declare class TagService {
    private tagModel;
    constructor(tagModel: TagModelType);
    create(input: CreateTagInput): Promise<boolean>;
    findAll(pagination: PaginationInput, filter: FilterGetAllTag): Promise<TagResult>;
    findOne(id: number): string;
    createTagPassion(): Promise<boolean>;
    createTagZodiac(): Promise<boolean>;
    createTagPersonality(): Promise<boolean>;
    createTagDiet(): Promise<boolean>;
    createTagPet(): Promise<boolean>;
    createTagEducation(): Promise<boolean>;
    createTagSmokeQuestion(): Promise<boolean>;
    deleteMany(): Promise<boolean>;
}
