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
import { ConfirmPasswordContent } from '@pages/resultPage/components/confirmPasswordContent';
import { ChangePasswordContent } from '@pages/resultPage/components/changePasswordContent';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router history={history}>
                <Routes>
                    <Route index={true} path={RouterPath.MAIN} element={<MainPage />} />
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
                                    title='Данные не сохранились'
                                    subTitle='Что-то пошло не так. Попробуйте ещё раз'
                                    extra={
                                        <ResultPageButton
                                            path={RouterPath.SIGN_IN_CHANGE_PASSWORD}
                                            text='Повторить'
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
                                    title='Пароль успешно изменен'
                                    subTitle={
                                        <>
                                            <div>Теперь можно войти в аккаунт, используя</div>
                                            <div>свой логин и новый пароль</div>
                                        </>
                                    }
                                    extra={
                                        <ResultPageButton path={RouterPath.SIGN_IN} text='Вход' />
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
                                    title='Вход не выполнен'
                                    subTitle='Что-то пошло не так. Попробуйте еще раз'
                                    extra={
                                        <ResultPageButton
                                            path={RouterPath.SIGN_IN}
                                            text='Повторить'
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
                                    title='Такой e-mail не зарегистрирован'
                                    subTitle='Мы не нашли в базе вашего e-mail. Попробуйте войти с другим e-mail.'
                                    extra={
                                        <ResultPageButton
                                            path={RouterPath.SIGN_IN}
                                            text='Попробовать снова'
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
                                    title='Что-то пошло не так'
                                    subTitle='Произошла ошибка, попробуйте отправить форму ещё раз.'
                                    extra={
                                        <ResultPageButton path={RouterPath.SIGN_IN} text='Назад' />
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
                                    title='Данные не сохранились'
                                    subTitle='Что-то пошло не так. Попробуйте еще раз'
                                    extra={
                                        <ResultPageButton
                                            path={RouterPath.SIGN_UP}
                                            text='Повторить'
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
                                    title='Данные не сохранились'
                                    subTitle={
                                        <>
                                            <div>
                                                Такой e-mail уже записан в системе. Попробуйте
                                            </div>
                                            <div>зарегистрироваться по другому e-mail.</div>
                                        </>
                                    }
                                    extra={
                                        <ResultPageButton
                                            path={RouterPath.SIGN_UP}
                                            text='Назад к регистрации'
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
                                    title='Регистрация успешна'
                                    subTitle={
                                        <>
                                            <div>Что-то пошло не так и ваша регистрация</div>
                                            <div>не завершилась. Попробуйте ещё раз.</div>
                                        </>
                                    }
                                    extra={
                                        <ResultPageButton path={RouterPath.SIGN_IN} text='Войти' />
                                    }
                                />
                            }
                        />
                    </Route>
                    <Route path={RouterPath.AUTH} element={<AuthPage />}>
                        <Route path={RouterPath.SIGN_IN} element={<SignInContent />} />
                        <Route path={RouterPath.SIGN_UP} element={<SignUpContent />} />
                    </Route>
                </Routes>
            </Router>
        </Provider>
    </React.StrictMode>,
);
