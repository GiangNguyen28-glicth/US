import { Model } from 'mongoose';
import { LoginInput, RegisterInput, ResetPasswordInput } from '../../auth/dto/auth.input';
import { FilterGetOneUser, UpdateUserInput } from './dto/user.input';
import { User } from './entities/user.entities';
import { UserDocument } from './schema/user.schema';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    getOne(filter: FilterGetOneUser): Promise<UserDocument | undefined>;
    signUp(input: RegisterInput): Promise<User>;
    markEmailAsConfirmed(email: string): Promise<User>;
    login(loginInput: LoginInput): Promise<UserDocument>;
    isCorrectPassword(password: string, user: User): Promise<boolean>;
    generateResetCode(user: User, randomString: string): Promise<void>;
    verifyResetpassword(input: ResetPasswordInput): Promise<boolean>;
    updateUser(input: UpdateUserInput, _id: string): Promise<User>;
    checkUserExists(userId: string): Promise<boolean>;
}
