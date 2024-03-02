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

export interface IFeedback {
    id: string,
    fullName: null | string,
    imageSrc: null | string,
    message: null | string,
    rating: number,
    createdAt: string
} 
