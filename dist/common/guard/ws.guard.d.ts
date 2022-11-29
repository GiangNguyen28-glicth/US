import { ExecutionContext } from '@nestjs/common';
declare const WsGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class WsGuard extends WsGuard_base {
    getRequest(context: ExecutionContext): any;
    handleRequest(err: any, user: any, info: any): any;
}
export {};
