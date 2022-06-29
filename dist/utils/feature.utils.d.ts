import { Schema } from 'mongoose';
export declare function getFieldsInFilter(filter: Object): Object;
export declare function isUndefinedOrNull(val: any): boolean;
export declare function toKeyword(text: string): string;
export declare function getQueryGetAll(prop: string, searchInput: string, fields?: Object): any;
export declare function isEmptyObject(obj: Object): boolean;
export declare function setInputForOldDocument(input: Object, oldDoc: Object): void;
export declare function toformatPrice(price: Schema.Types.Decimal128): string;
