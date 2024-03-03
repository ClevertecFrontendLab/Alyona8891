import { createSlice } from '@reduxjs/toolkit';
import { IFeedback, IPostFeedback, ISignUpData } from '../../types';
import { RequestResult } from '@constants/constants';

interface IAppSliceState {
    authPageContent: 'signIn' | 'signUp';
    isLoading: boolean;
    userData: ISignUpData | null | Record<'email', string>;
    userLoginData: null | string;
    newPassword: null | string;
    activeToken: null | string;
    isErrorModal: boolean;
    isFeedbackModal: boolean;
    feedbacks: IFeedback[] | [];
    requestResult: null | RequestResult;
    userFeedback: null | IPostFeedback;
}

const initialState: IAppSliceState = {
    authPageContent: 'signIn',
    isLoading: false,
    userData: null,
    userLoginData: null,
    newPassword: null,
    activeToken: null,
    isErrorModal: false,
    isFeedbackModal: false,
    feedbacks: [
        {
            id: 'sc',
            fullName: 'dlkld',
            imageSrc: 'ldkodk',
            message: 'djodj',
            rating: 5,
            createdAt: '2024-03-03T22:01:19.360Z',
        },
    ],
    requestResult: null,
    userFeedback: null,
};

export const appSlice = createSlice({
    name: 'appData',
    initialState,
    reducers: {
        setAuthPageContent: (state, action) => {
            state.authPageContent = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
        setUserLoginData: (state, action) => {
            state.userLoginData = action.payload;
        },
        setActiveToken: (state, action) => {
            state.activeToken = action.payload;
        },
        setNewPassword: (state, action) => {
            state.newPassword = action.payload;
        },
        setIsErrorModal: (state, action) => {
            state.isErrorModal = action.payload;
        },
        setIsFeedbackModal: (state, action) => {
            state.isFeedbackModal = action.payload;
        },
        setFeedbacks: (state, action) => {
            state.feedbacks = [...action.payload];
        },
        setRequestResult: (state, action) => {
            state.requestResult = action.payload;
        },
        setUserFeedback: (state, action) => {
            state.userFeedback = action.payload;
        },
    },
});

export const {
    setAuthPageContent,
    setIsLoading,
    setUserData,
    setUserLoginData,
    setActiveToken,
    setNewPassword,
    setIsErrorModal,
    setIsFeedbackModal,
    setFeedbacks,
    setRequestResult,
    setUserFeedback,
} = appSlice.actions;
export const appReducer = appSlice.reducer;
