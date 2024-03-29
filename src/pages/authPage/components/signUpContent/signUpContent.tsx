import React, { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';

import styles from './signUpContent.module.scss';
import { Button, Form, Input, Space } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined, GooglePlusOutlined } from '@ant-design/icons';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { ErrorCodes, RouterPath, TEXT, VALIDATION_RULES } from '@constants/index';
import { useSignUpUserMutation } from '@redux/utils/api';
import { SignUpData } from '../../../../types';
import { history } from '@redux/configure-store';
import { AppDispatch, RootState, useAppDispatch } from '@redux/configure-store';
import { setIsLoading, setUserData } from '@redux/reducers/appReducer';
import { useSelector } from 'react-redux';
import { routerSelector } from '@utils/index';

export const SignUpContent: React.FC = () => {
    const breakpoint = useBreakpoint();
    const [form] = Form.useForm();
    const [isFirstValidation, setIsFirstValidation] = useState<boolean>(true);
    const [signUpUser, { isLoading }] = useSignUpUserMutation();
    const dispatch: AppDispatch = useAppDispatch();
    const userData = useSelector((state: RootState) => state.app.userData);
    const router = useSelector(routerSelector);

    useEffect(() => {
        if (isLoading) {
            dispatch(setIsLoading(true));
        } else {
            dispatch(setIsLoading(false));
        }
    }, [dispatch, isLoading]);

    const onFinish = useCallback(
        (values: SignUpData) => {
            const { email, password } = values;
            dispatch(setUserData(values));

            signUpUser({ email, password })
                .unwrap()
                .then(() => {
                    dispatch(setUserData(null));
                    history.push(RouterPath.SIGN_UP_RESULT_SUCCESS);
                })
                .catch((error) => {
                    if (error.status === ErrorCodes.CONFLICT) {
                        history.push(RouterPath.SIGN_UP_RESULT_ERROR_409);
                        return;
                    } else {
                        history.push(RouterPath.SIGN_UP_RESULT_ERRORS);
                    }
                });
        },
        [dispatch, signUpUser],
    );

    useEffect(() => {
        if (
            userData &&
            router.previousLocations &&
            router.previousLocations?.length > 0 &&
            router.previousLocations[1].location?.pathname === RouterPath.SIGN_UP_RESULT_ERRORS
        ) {
            onFinish(userData as SignUpData);
        }
    }, [onFinish, router, router.previousLocations, userData]);

    const isValid = () => {
        if (isFirstValidation) {
            setIsFirstValidation(false);
        }
    };

    return (
        <Form
            form={form}
            className={styles[cn('form')]}
            name='register'
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            onFinishFailed={(error) => {
                console.log({ error });
            }}
            autoComplete='off'
            requiredMark={false}
            onFieldsChange={isValid}
        >
            <Form.Item
                shouldUpdate
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
                    data-test-id='registration-email'
                    size='large'
                    className={styles[cn('input')]}
                    addonBefore={TEXT.input.email.label}
                />
            </Form.Item>

            <Form.Item
                name='password'
                help={
                    <span className={styles[cn(`password_helper`)]}>
                        {TEXT.input.password.helper}
                    </span>
                }
                rules={[
                    { required: true, message: '' },
                    { min: 8, message: '' },
                    {
                        pattern: VALIDATION_RULES.password,
                        message: '',
                    },
                ]}
            >
                <Input.Password
                    data-test-id='registration-password'
                    size='large'
                    className={styles[cn('input')]}
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

            <Form.Item
                dependencies={['password']}
                name='confirmPassword'
                rules={[
                    {
                        required: true,
                        message: '',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error(''));
                        },
                    }),
                ]}
            >
                <Input.Password
                    data-test-id='registration-confirm-password'
                    size='large'
                    className={styles[cn('input')]}
                    placeholder={TEXT.input.confirmPassword.placeholder}
                    iconRender={(visible) =>
                        visible ? (
                            <EyeOutlined style={{ color: 'var(--color-primary)' }} />
                        ) : (
                            <EyeInvisibleOutlined />
                        )
                    }
                />
            </Form.Item>

            <Form.Item>
                <Space
                    className={styles[cn('buttons_container')]}
                    direction='vertical'
                    size='middle'
                >
                    <Button
                        data-test-id='registration-submit-button'
                        className={styles[cn('button')]}
                        size='large'
                        type='primary'
                        htmlType='submit'
                    >
                        {TEXT.button.signIn}
                    </Button>
                    <Button
                        className={styles[cn('button')]}
                        size='large'
                        icon={breakpoint.xs ? '' : <GooglePlusOutlined />}
                    >
                        {TEXT.button.signUpUsingGoogle}
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};
