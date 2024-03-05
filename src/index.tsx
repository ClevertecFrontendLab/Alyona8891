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
import { RESULT_CARDS_DATA, RouterPath } from './constants';
import { AuthPage } from '@pages/authPage';
import { SignInContent } from '@pages/authPage/components/signInContent';
import { SignUpContent } from '@pages/authPage/components/signUpContent/signUpContent';
import { Result } from 'antd';
import { ResultPage } from '@pages/resultPage/';
import { ResultPageButton } from '@pages/resultPage/components/button';
import { ConfirmPasswordContent } from '@pages/resultPage/components/confirmPasswordContent';
import { ChangePasswordContent } from '@pages/resultPage/components/changePasswordContent';
import { RedirectToSignIn } from './pages/ui/redirectTosignIn/redirectTosignIn';
import { FeedbacksPage } from '@pages/feedbacksPage';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router history={history}>
                <Routes>
                    <Route index={true} path={RouterPath.MAIN} element={<MainPage />} />
                    <Route path={RouterPath.FEEDBACKS} element={<FeedbacksPage />} />
                    <Route path={RouterPath.SIGN_IN} element={<ResultPage />}>
                        <Route
                            path={RouterPath.SIGN_IN_CONFIRM_EMAIL}
                            element={<ConfirmPasswordContent />}
                        />
                    </Route>
                    <Route path={RouterPath.SIGN_IN} element={<ResultPage />}>
                        <Route
                            path={RouterPath.SIGN_IN_CHANGE_PASSWORD_ERRORS}
                            element={
                                <Result
                                    status='error'
                                    title={RESULT_CARDS_DATA.changePassword.errors.title}
                                    subTitle={RESULT_CARDS_DATA.changePassword.errors.subtitle}
                                    extra={
                                        <ResultPageButton
                                            data='change-retry-button'
                                            path={RouterPath.SIGN_IN_CHANGE_PASSWORD}
                                            text={RESULT_CARDS_DATA.changePassword.errors.button}
                                        />
                                    }
                                />
                            }
                        />
                        <Route
                            path={RouterPath.SIGN_IN_CHANGE_PASSWORD_SUCCESS}
                            element={
                                <Result
                                    status='success'
                                    title={RESULT_CARDS_DATA.changePassword.success.title}
                                    subTitle={
                                        <>
                                            <div>
                                                {
                                                    RESULT_CARDS_DATA.changePassword.success
                                                        .subtitle.part1
                                                }
                                            </div>
                                            <div>
                                                {
                                                    RESULT_CARDS_DATA.changePassword.success
                                                        .subtitle.part2
                                                }
                                            </div>
                                        </>
                                    }
                                    extra={
                                        <ResultPageButton
                                            data='change-entry-button'
                                            path={RouterPath.SIGN_IN}
                                            text={RESULT_CARDS_DATA.changePassword.success.button}
                                        />
                                    }
                                />
                            }
                        />
                        <Route
                            path={RouterPath.SIGN_IN_CHANGE_PASSWORD}
                            element={<ChangePasswordContent />}
                        ></Route>
                    </Route>

                    <Route path={RouterPath.SIGN_IN_RESULT} element={<ResultPage />}>
                        <Route
                            path={RouterPath.SIGN_IN_RESULT_ERROR}
                            element={
                                <Result
                                    status='warning'
                                    title={RESULT_CARDS_DATA.signIn.errors.title}
                                    subTitle={RESULT_CARDS_DATA.signIn.errors.subtitle}
                                    extra={
                                        <ResultPageButton
                                            data='login-retry-button'
                                            path={RouterPath.SIGN_IN}
                                            text={RESULT_CARDS_DATA.signIn.errors.button}
                                        />
                                    }
                                />
                            }
                        />
                        <Route
                            path={RouterPath.SIGN_IN_RESULT_CHECK_ERROR_404}
                            element={
                                <Result
                                    status='error'
                                    title={RESULT_CARDS_DATA.signIn.error404.title}
                                    subTitle={RESULT_CARDS_DATA.signIn.error404.subtitle}
                                    extra={
                                        <ResultPageButton
                                            data='check-retry-button'
                                            path={RouterPath.SIGN_IN}
                                            text={RESULT_CARDS_DATA.signIn.error404.button}
                                        />
                                    }
                                />
                            }
                        />
                        <Route
                            path={RouterPath.SIGN_IN_RESULT_CHECK_ERRORS}
                            element={
                                <Result
                                    status='500'
                                    title={RESULT_CARDS_DATA.checkPassword.errors.title}
                                    subTitle={RESULT_CARDS_DATA.checkPassword.errors.subtitle}
                                    extra={
                                        <ResultPageButton
                                            data='check-back-button'
                                            path={RouterPath.SIGN_IN}
                                            text={RESULT_CARDS_DATA.checkPassword.errors.button}
                                        />
                                    }
                                />
                            }
                        />
                    </Route>
                    <Route path={RouterPath.SIGN_UP_RESULT} element={<ResultPage />}>
                        <Route
                            path={RouterPath.SIGN_UP_RESULT_ERRORS}
                            element={
                                <Result
                                    status='error'
                                    title={RESULT_CARDS_DATA.signUp.errors.title}
                                    subTitle={RESULT_CARDS_DATA.signUp.errors.subtitle}
                                    extra={
                                        <ResultPageButton
                                            data='registration-retry-button'
                                            path={RouterPath.SIGN_UP}
                                            text={RESULT_CARDS_DATA.signUp.errors.button}
                                        />
                                    }
                                />
                            }
                        />
                        <Route
                            path={RouterPath.SIGN_UP_RESULT_ERROR_409}
                            element={
                                <Result
                                    status='error'
                                    title={RESULT_CARDS_DATA.signUp.error409.title}
                                    subTitle={
                                        <>
                                            <div>
                                                {RESULT_CARDS_DATA.signUp.error409.subtitle.part1}
                                            </div>
                                            <div>
                                                {RESULT_CARDS_DATA.signUp.error409.subtitle.part2}
                                            </div>
                                        </>
                                    }
                                    extra={
                                        <ResultPageButton
                                            data='registration-back-button'
                                            path={RouterPath.SIGN_UP}
                                            text={RESULT_CARDS_DATA.signUp.error409.button}
                                        />
                                    }
                                />
                            }
                        />
                        <Route
                            path={RouterPath.SIGN_UP_RESULT_SUCCESS}
                            element={
                                <Result
                                    status='success'
                                    title={RESULT_CARDS_DATA.signUp.success.title}
                                    subTitle={
                                        <>
                                            <div>
                                                {RESULT_CARDS_DATA.signUp.success.subtitle.part1}
                                            </div>
                                            <div>
                                                {RESULT_CARDS_DATA.signUp.success.subtitle.part2}
                                            </div>
                                        </>
                                    }
                                    extra={
                                        <ResultPageButton
                                            data='registration-enter-button'
                                            path={RouterPath.SIGN_IN}
                                            text={RESULT_CARDS_DATA.signUp.success.button}
                                        />
                                    }
                                />
                            }
                        />
                    </Route>
                    <Route path={RouterPath.AUTH} element={<AuthPage />}>
                        <Route path={RouterPath.SIGN_IN} element={<SignInContent />} />
                        <Route path={RouterPath.SIGN_UP} element={<SignUpContent />} />
                    </Route>
                    <Route path='/' element={<RedirectToSignIn />} />
                </Routes>
            </Router>
        </Provider>
    </React.StrictMode>,
);
