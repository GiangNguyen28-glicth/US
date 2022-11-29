import { Types } from 'mongoose';
type IPopulateSelect<T> = (keyof T | `-${Extract<keyof T, string>}`)[];
type IRefOption<T> = {
    autoPopulate: true;
    select: IPopulateSelect<T>;
} | {
    autoPopulate: false;
    readonly select?: false;
};
export declare const ref: <T>(Entity: new () => T, option: IRefOption<T>) => {
    type: typeof Types.ObjectId;
    ref: string;
    default: any;
    autoPopulate: boolean | {
        select: false | IPopulateSelect<T>;
    };
};
export {};
