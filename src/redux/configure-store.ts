import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory();

export const store = configureStore({
    reducer: {},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
