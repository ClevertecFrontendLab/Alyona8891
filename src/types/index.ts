export interface IUserData {
    email: string;
    password: string;
}

export interface ISignInData extends IUserData {
    isRemembered?: boolean;
}

export interface ISignUpData extends IUserData {
    confirmPassword: string;
}
