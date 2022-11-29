import { ExecutionContext } from '@nestjs/common';
declare const GoogleGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class GoogleGuard extends GoogleGuard_base {
    getRequest(context: ExecutionContext): any;
    handleRequest(err: any, user: any, info: any): any;
}
export {};
