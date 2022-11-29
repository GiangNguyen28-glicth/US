import { VerifyCallback } from 'passport-facebook';
declare const FaceBookStrategy_base: new (...args: any[]) => any;
export declare class FaceBookStrategy extends FaceBookStrategy_base {
    constructor();
    validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any>;
}
export {};
