import { createSlice } from '@reduxjs/toolkit';
import { ISignUpData } from '../../types';

interface IAppSliceState {
    authPageContent: 'signIn' | 'signUp';
    isLoading: boolean;
    userData: ISignUpData | null;
    activeToken: null | string;
}

const initialState: IAppSliceState = {
    authPageContent: 'signIn',
    isLoading: false,
    userData: null,
    activeToken: null,
};

export const appSlice = createSlice({
    name: 'appData',
    initialState,
    reducers: {
        changeAuthPageContent: (state) => {
            if (state.authPageContent === 'signIn') {
                state.authPageContent = 'signUp';
            } else {
                state.authPageContent = 'signIn';
            }
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
        setActiveToken: (state, action) => {
            state.activeToken = action.payload;
        },
    },
});

export const { changeAuthPageContent, setIsLoading, setUserData, setActiveToken } =
    appSlice.actions;
export const appReducer = appSlice.reducer;
