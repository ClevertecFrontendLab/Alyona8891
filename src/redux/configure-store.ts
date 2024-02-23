import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { appReducer } from './reducers/appReducer';
import { useDispatch } from 'react-redux';

export const history = createBrowserHistory();

export const store = configureStore({
    reducer: {
        app: appReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
