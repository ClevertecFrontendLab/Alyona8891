import { createSlice } from '@reduxjs/toolkit';

interface IAppSliceState {
    authPageContent: 'signIn' | 'signUp';
    isLoading: boolean;
}

const initialState: IAppSliceState = {
    authPageContent: 'signIn',
    isLoading: false,
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
    },
});

export const { changeAuthPageContent, setIsLoading } = appSlice.actions;
export const appReducer = appSlice.reducer;
