import { Request } from 'express';
declare const RtStrategy_base: new (...args: any[]) => any;
export declare class RtStrategy extends RtStrategy_base {
    constructor();
    validate(req: Request, payload: any): any;
}
export {};
