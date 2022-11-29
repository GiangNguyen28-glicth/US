import { User } from '../../modules/user/entities/user.entities';
import { UserService } from '../../modules/user/user.service';
import { IJwtPayload } from '../entities/auth.entities';
declare const WsStrategy_base: new (...args: any[]) => any;
export declare class WsStrategy extends WsStrategy_base {
    private userService;
    constructor(userService: UserService);
    validate(payload: IJwtPayload): Promise<User>;
}
export {};
