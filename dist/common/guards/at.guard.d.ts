import { ExecutionContext } from '@nestjs/common';
declare const AtGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class AtGuard extends AtGuard_base {
    getRequest(context: ExecutionContext): any;
}
export {};
