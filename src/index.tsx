import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import { Route, Routes } from 'react-router-dom';

import { store, history } from '@redux/configure-store';
import { MainPage } from './pages';

import 'normalize.css';
import './index.css';
import '../src/constants/themes/customized.css';
import { RouterPath } from './constants';
import { AuthPage } from '@pages/authPage';
import { SignInContent } from '@pages/authPage/components/signInContent';
import { SignUpContent } from '@pages/authPage/components/signUpContent/signUpContent';
import { Result } from 'antd';
import { ResultPage } from '@pages/resultPage/';
import { ResultPageButton } from '@pages/resultPage/components/button';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router history={history}>
                <Routes>
                    <Route index={true} path={RouterPath.MAIN} element={<MainPage />} />
                    <Route path={RouterPath.SIGN_IN_RESULT} element={<ResultPage />}>
                        <Route
                            path={RouterPath.SIGN_IN_RESULT_ERROR}
                            element={
                                <Result
                                    status='warning'
                                    title='Вход не выполнен'
                                    subTitle="Что-то пошло не так. Попробуйте еще раз"
                                    extra={
                                        <ResultPageButton path={RouterPath.SIGN_IN} />
                                    }
                                />
                            }
                        />
                    </Route>
                    <Route path={RouterPath.SIGN_UP_RESULT_ERRORS} element={<ResultPage />} />
                    <Route path={RouterPath.SIGN_UP_RESULT_ERROR_409} element={<ResultPage />} />
                    <Route path={RouterPath.SIGN_UP_RESULT_SUCCESS} element={<ResultPage />} />
                    <Route path={RouterPath.AUTH} element={<AuthPage />}>
                        <Route path={RouterPath.SIGN_IN} element={<SignInContent />} />
                        <Route path={RouterPath.SIGN_UP} element={<SignUpContent />} />
                    </Route>
                </Routes>
            </Router>
        </Provider>
    </React.StrictMode>,
);
