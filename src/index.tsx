import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HistoryRouter } from 'redux-first-history/rr6';
import { Route, Routes } from 'react-router-dom';

import { store, history } from '@redux/configure-store';
import { MainPage } from './pages';

import 'antd/dist/antd.css';
import 'normalize.css';
import './index.css';
import { RouterPath } from './constants';
import { AuthPage } from '@pages/authPage';
import { SignInContent } from '@pages/authPage/components/signInContent';
import { SignUpContent } from '@pages/authPage/components/signUpContent/signUpContent';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HistoryRouter history={history}>
                <Routes>
                    <Route index={true} path={RouterPath.MAIN} element={<MainPage />} />
                    <Route path={RouterPath.AUTH} element={<AuthPage />}>
                        <Route path={RouterPath.SIGN_IN} element={<SignInContent />} />
                        <Route path={RouterPath.SIGN_UP} element={<SignUpContent />} />
                    </Route>
                </Routes>
            </HistoryRouter>
        </Provider>
    </React.StrictMode>,
);
