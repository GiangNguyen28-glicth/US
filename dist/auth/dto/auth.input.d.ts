export declare class BaseUser {
    username?: string;
    phonenumber?: string;
}
export declare class BasePassword {
    password: string;
}
export declare class RegisterInput extends BaseUser {
    email: string;
    password: string;
    confirmpassword: string;
}
export declare class LoginInput {
    email: string;
    password: string;
}
export declare class ResetPasswordInput extends BasePassword {
    code: string;
    userId: string;
    confirmpassword: string;
}
