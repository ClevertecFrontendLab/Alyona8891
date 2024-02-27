import React, { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';

import styles from './signInContent.module.scss';
import { Button, Checkbox, Form, Input, Space, Typography } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined, GooglePlusOutlined } from '@ant-design/icons';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { RouterPath, TEXT, VALIDATION_RULES } from '@constants/index';
import { RootState, history } from '@redux/configure-store';
import { FieldError } from 'rc-field-form/es/interface';
import { useCheckEmailMutation, useSignInUserMutation } from '@redux/utils/api';
import { ISignInData } from '../../../../types';
import { AppDispatch, useAppDispatch } from '@redux/configure-store';
import { setActiveToken, setIsLoading, setUserData, setUserLoginData } from '@redux/reducers/appReducer';
import { useSelector } from 'react-redux';

export const SignInContent: React.FC = () => {
    const breakpoint = useBreakpoint();
    const [form] = Form.useForm();
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [isFirstValidation, setIsFirstValidation] = useState<boolean>(false);
    const [signInUser, { isLoading }] = useSignInUserMutation();
    const [checkEmail, { isLoading: isLoadingChecking }] = useCheckEmailMutation();
    const dispatch: AppDispatch = useAppDispatch();
    const [isEmailValidated, setisEmailValidated] = useState<boolean>(false);
    const [isRemembered, setIsRemembered] = useState(false);
    const userLoginData = useSelector((state: RootState) => state.app.userLoginData);
    const router = useSelector((state: RootState) => state.router);

    useEffect(() => {
        if (isLoading || isLoadingChecking) {
            dispatch(setIsLoading(true));
        } else {
            dispatch(setIsLoading(false));
        }
    }, [dispatch, isLoading, isLoadingChecking]);

    const onFinish = useCallback((values: ISignInData) => {
        const { email, password } = values;

        signInUser({ email, password })
            .unwrap()
            .then((res) => {
                if (isRemembered) {
                    localStorage.setItem('alyona8891_token', res.accessToken);
                } else {
                    dispatch(setActiveToken(res.accessToken));
                }
                history.push(RouterPath.MAIN);
            })
            .catch(() => {
                history.push(RouterPath.SIGN_IN_RESULT_ERROR);
            });
    }, [dispatch, isRemembered, signInUser]);

    const handleChangePassword = useCallback((email?: string) => {
        let changingEmail;
        if(email) {
            console.log(1)
            changingEmail = email;
        } else {
            changingEmail = form.getFieldValue('email') as string;
            dispatch(setUserLoginData(changingEmail));
        }

        checkEmail({email: changingEmail })
            .unwrap()
            .then(() => {})
            .catch((error) => {
                if (error.status === 404 && error.data.message === 'Email не найден') {
                    history.push(RouterPath.SIGN_IN_RESULT_CHECK_ERROR_404);
                } else {
                    history.push(RouterPath.SIGN_IN_RESULT_CHECK_ERRORS);
                }
            });
    }, [checkEmail, dispatch, form]);

    useEffect(() => {
        console.log(userLoginData)
        console.log(router)

        if (
            userLoginData &&
            router.previousLocations &&
            router.previousLocations?.length > 1 &&
            router.previousLocations[1].location?.pathname === RouterPath.SIGN_IN_RESULT_CHECK_ERRORS
        ) {
            console.log(router.previousLocations[1].location?.pathname)
            handleChangePassword(userLoginData);
        }
    }, [handleChangePassword, router, router.previousLocations, userLoginData]);

    function fieldIsEmpty(field: FieldError) {
        const fieldValue = form.getFieldValue(field.name.join('.'));
        return fieldValue === undefined || [].concat(fieldValue).join().trim() === '';
    }

    function fieldHasError(field: FieldError) {
        return field.errors.length > 0;
    }

    function fieldEmailHasError() {
        setisEmailValidated(form.getFieldError('email').length > 0);
    }

    function isValid() {
        if (isFirstValidation) {
            setIsFirstValidation(false);
            setIsDisabled(true);
        }
        const fields = form
            .getFieldsError()
            .filter((field) => fieldIsEmpty(field) || fieldHasError(field));
        setIsDisabled(fields.length > 0);
    }

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
                isValid();
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
                        checked={isRemembered}
                        onChange={() => setIsRemembered(!isRemembered)}
                    >
                        {TEXT.input.rememberMeCheckbox.label}
                    </Checkbox>
                </Form.Item>
                <Typography.Link onClick={() => handleChangePassword()} disabled={isEmailValidated}>
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
                        className={styles[cn('button')]}
                        size='large'
                        type='primary'
                        htmlType='submit'
                        disabled={isDisabled}
                    >
                        {TEXT.button.signIn}
                    </Button>
                    <Button
                        className={styles[cn('button')]}
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
