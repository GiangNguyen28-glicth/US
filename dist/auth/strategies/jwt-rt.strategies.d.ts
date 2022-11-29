import { Request } from 'express';
import { IJwtPayload, RefreshPayload } from '../entities/auth.entities';
declare const RtStrategy_base: new (...args: any[]) => any;
export declare class RtStrategy extends RtStrategy_base {
    constructor();
    validate(req: Request, payload: IJwtPayload): RefreshPayload;
}
export {};
