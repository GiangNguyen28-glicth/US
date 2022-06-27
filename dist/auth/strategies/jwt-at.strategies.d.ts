import { User } from '../../modules/user/entities/user.entities';
import { UserService } from '../../modules/user/user.service';
import { IJwtPayload } from '../entities/auth.entities';
declare const AtStrategy_base: new (...args: any[]) => any;
export declare class AtStrategy extends AtStrategy_base {
    private userService;
    constructor(userService: UserService);
    validate(payload: IJwtPayload): Promise<User>;
}
export {};
