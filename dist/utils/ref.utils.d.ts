import { Schema } from 'mongoose';
declare type IPopulateSelect<T> = (keyof T | `-${Extract<keyof T, string>}`)[];
declare type IRefOption<T> = {
    autoPopulate?: true;
    select?: IPopulateSelect<T>;
} | {
    autoPopulate: false;
    readonly select?: null;
};
export declare const ref: <T>(Entity: new () => T, option?: IRefOption<T>) => {
    type: typeof Schema.Types.ObjectId;
    ref: string;
    default: any;
    autopopulate: boolean | {
        select: IPopulateSelect<T>;
    };
};
export {};
