import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { EActiveKeys } from '../../types';

interface IAppSliceState {
    authPageContent: 'signIn' | 'signUp';
}

const initialState: IAppSliceState = {
    authPageContent: 'signIn',
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
    },
});

export const { changeAuthPageContent } = appSlice.actions;
export const appReducer = appSlice.reducer;
