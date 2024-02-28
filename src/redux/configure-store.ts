import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { appReducer } from './reducers/appReducer';
import { useDispatch } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiService } from './utils/api';
import { createReduxHistoryContext } from 'redux-first-history';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
    savePreviousLocations:100,
});

export const store = configureStore({
    reducer: combineReducers({
        router: routerReducer,
        [apiService.reducerPath]: apiService.reducer,
        app: appReducer,
    }),

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiService.middleware, routerMiddleware),
});

export const history = createReduxHistory(store);

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
