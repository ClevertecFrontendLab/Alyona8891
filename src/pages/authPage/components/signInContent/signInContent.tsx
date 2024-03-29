import { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';

import styles from './signInContent.module.scss';
import { Button, Checkbox, Form, Input, Space, Typography } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined, GooglePlusOutlined } from '@ant-design/icons';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import {
    ErrorCodes,
    RouterPath,
    TEXT,
    TOKEN_STORAGE_PROPERTY,
    VALIDATION_RULES,
} from '@constants/index';
import { RootState, history } from '@redux/configure-store';
import { useCheckEmailMutation, useSignInUserMutation } from '@redux/utils/api';
import { SignInData } from '../../../../types';
import { AppDispatch, useAppDispatch } from '@redux/configure-store';
import { setIsLoading, setUserLoginData } from '@redux/reducers/appReducer';
import { useSelector } from 'react-redux';
import { routerSelector } from '@utils/index';

export const SignInContent: React.FC = () => {
    const breakpoint = useBreakpoint();
    const [form] = Form.useForm();
    const [signInUser, { isLoading }] = useSignInUserMutation();
    const [checkEmail, { isLoading: isLoadingChecking }] = useCheckEmailMutation();
    const dispatch: AppDispatch = useAppDispatch();
    const [isEmailValidated, setIsEmailValidated] = useState<boolean>(false);
    const [isRemembered, setIsRemembered] = useState(false);
    const userLoginData = useSelector((state: RootState) => state.app.userLoginData);
    const router = useSelector(routerSelector);

    useEffect(() => {
        if (isLoading || isLoadingChecking) {
            dispatch(setIsLoading(true));
        } else {
            dispatch(setIsLoading(false));
        }
    }, [dispatch, isLoading, isLoadingChecking]);

    const onFinish = useCallback(
        (values: SignInData) => {
            const { email, password } = values;

            signInUser({ email, password })
                .unwrap()
                .then((res) => {
                    if (isRemembered) {
                        localStorage.setItem(TOKEN_STORAGE_PROPERTY, res.accessToken);
                    } else {
                        sessionStorage.setItem(TOKEN_STORAGE_PROPERTY, res.accessToken);
                    }
                    history.push(RouterPath.MAIN);
                })
                .catch(() => {
                    history.push(RouterPath.SIGN_IN_RESULT_ERROR);
                });
        },
        [isRemembered, signInUser],
    );

    const handleChangePassword = useCallback(
        (email?: string) => {
            if (isEmailValidated) {
                let changingEmail;
                if (email) {
                    changingEmail = email;
                } else {
                    changingEmail = form.getFieldValue('email') as string;
                    dispatch(setUserLoginData(changingEmail));
                }

                checkEmail({ email: changingEmail })
                    .unwrap()
                    .then(() => {
                        history.push(RouterPath.SIGN_IN_CONFIRM_EMAIL);
                    })
                    .catch((error) => {
                        if (
                            error.status === ErrorCodes.NOT_FOUND &&
                            error.data.message === 'Email не найден'
                        ) {
                            history.push(RouterPath.SIGN_IN_RESULT_CHECK_ERROR_404);
                        } else {
                            history.push(RouterPath.SIGN_IN_RESULT_CHECK_ERRORS);
                        }
                    });
            }
        },
        [checkEmail, dispatch, form, isEmailValidated],
    );

    const handleAuthGoogle = async () => {
        window.location.href = 'https://marathon-api.clevertec.ru/auth/google';
    };

    useEffect(() => {
        if (
            userLoginData &&
            router.previousLocations &&
            router.previousLocations?.length > 1 &&
            router.previousLocations[1].location?.pathname ===
                RouterPath.SIGN_IN_RESULT_CHECK_ERRORS
        ) {
            setIsEmailValidated(true);
            handleChangePassword(userLoginData);
        }
    }, [handleChangePassword, router, router.previousLocations, userLoginData]);

    const fieldEmailHasError = () => {
        setIsEmailValidated(!(form.getFieldError('email').length > 0));
    };

    return (
        <Form
            form={form}
            className={styles[cn('form')]}
            name='basic'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete='off'
            onFieldsChange={() => {
                fieldEmailHasError();
            }}
        >
            <Form.Item
                name='email'
                rules={[
                    { required: true, message: '' },
                    {
                        pattern: VALIDATION_RULES.email,
                        message: '',
                    },
                ]}
            >
                <Input
                    data-test-id='login-email'
                    size='large'
                    className={styles[cn('input')]}
                    addonBefore={TEXT.input.email.label}
                />
            </Form.Item>

            <Form.Item
                name='password'
                rules={[
                    { required: true, message: '' },
                    {
                        pattern: VALIDATION_RULES.password,
                        message: '',
                    },
                ]}
            >
                <Input.Password
                    data-test-id='login-password'
                    size='large'
                    placeholder={TEXT.input.password.placeholder}
                    iconRender={(visible) =>
                        visible ? (
                            <EyeOutlined style={{ color: 'var(--color-primary)' }} />
                        ) : (
                            <EyeInvisibleOutlined />
                        )
                    }
                />
            </Form.Item>

            <Space
                className={styles[cn('checkbox_container')]}
                direction='horizontal'
                align='center'
                size='large'
            >
                <Form.Item>
                    <Checkbox
                        data-test-id='login-remember'
                        checked={isRemembered}
                        onChange={() => setIsRemembered(!isRemembered)}
                    >
                        {TEXT.input.rememberMeCheckbox.label}
                    </Checkbox>
                </Form.Item>
                <Typography.Link
                    data-test-id='login-forgot-button'
                    onClick={() => handleChangePassword()}
                >
                    {TEXT.link.forgetPassword}
                </Typography.Link>
            </Space>

            <Form.Item>
                <Space
                    className={styles[cn('buttons_container')]}
                    direction='vertical'
                    size='middle'
                >
                    <Button
                        data-test-id='login-submit-button'
                        className={styles[cn('button')]}
                        size='large'
                        type='primary'
                        htmlType='submit'
                    >
                        {TEXT.button.signIn}
                    </Button>
                    <Button
                        className={styles[cn('button')]}
                        onClick={handleAuthGoogle}
                        size='large'
                        icon={breakpoint.xs ? '' : <GooglePlusOutlined />}
                    >
                        {TEXT.button.signInUsingGoogle}
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};
