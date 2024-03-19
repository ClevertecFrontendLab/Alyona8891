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

export type TBreadcrumbItemData = {
    key: string;
    path: string;
    breadcrumbName: string;
};

export type THeaderComponentProps = {
    routes: TBreadcrumbItemData[];
    title?: string[];
};

export type PostFeedback = {
    message: string;
    rating: number;
};

export type ErrorType = {
    status?: number;
    data: unknown;
};

export type TTraining = {
    name: string;
    key: string;
};

export type TSidePanelFormsData = {
    id?: string;
    name: string | null;
    time: number | null;
    quantity: number | null;
    weight: number | null;
};

export type TUserTraining = {
    _id?: string;
    name: string;
    date: string;
    isImplementation?: boolean;
    userId?: string;
    parameters?: {
        repeat: boolean;
        period: number;
        jointTraining: boolean;
        participants: string[];
    };
    exercises: {
        _id?: string;
        name: string;
        replays: number;
        weight: number;
        approaches: number;
        isImplementation: boolean;
    }[];
};
