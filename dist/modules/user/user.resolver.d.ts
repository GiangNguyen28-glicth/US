import { UpdateUserInput } from './dto/user.input';
import { User } from './entities/user.entities';
import { UserService } from './user.service';
export declare class UserResolver {
    private userService;
    constructor(userService: UserService);
    updateUser(input: UpdateUserInput, user: User): Promise<User>;
}
