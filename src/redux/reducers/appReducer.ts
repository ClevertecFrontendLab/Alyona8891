import { createSlice } from '@reduxjs/toolkit';
import { ISignUpData } from '../../types';

interface IAppSliceState {
    authPageContent: 'signIn' | 'signUp';
    isLoading: boolean;
    userData: ISignUpData | null | Record<'email', string>;
    userLoginData: null | string;
    newPassword: null | string;
    activeToken: null | string;
    isModal: boolean;
}

const initialState: IAppSliceState = {
    authPageContent: 'signIn',
    isLoading: false,
    userData: null,
    userLoginData: null,
    newPassword: null,
    activeToken: null,
    isModal: true,
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
        setIsModal: (state, action) => {
            state.isModal = action.payload;
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
    setIsModal,
} = appSlice.actions;
export const appReducer = appSlice.reducer;
