import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { appReducer } from './reducers/appReducer';
import { useDispatch } from 'react-redux';
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiService } from './utils/api';

export const history = createBrowserHistory();

export const store = configureStore({
    reducer: {
        [apiService.reducerPath]: apiService.reducer,
        app: appReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat( apiService.middleware,),
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
