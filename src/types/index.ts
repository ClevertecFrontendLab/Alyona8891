export type UserData = {
    email: string;
    password: string;
};

export type SignInData = {
    email: string;
    password: string;
    isRemembered?: boolean;
};

export type SignUpData = {
    email: string;
    password: string;
    confirmPassword: string;
};

export type Feedback = {
    id: string;
    fullName: null | string;
    imageSrc: null | string;
    message: null | string;
    rating: number;
    createdAt: string;
};

export type BreadcrumbItemData = {
    key: number;
    path: string;
    breadcrumbName: string;
};

export type PostFeedback = {
    message: string;
    rating: number;
};

export type ErrorType = {
    status?: number;
    data: unknown;
};
