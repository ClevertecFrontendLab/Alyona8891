import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import styles from './signUpContent.module.scss';
import { Button, Form, Input, Space } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined, GooglePlusOutlined } from '@ant-design/icons';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { RouterPath, TEXT, VALIDATION_RULES } from '@constants/index';
import { FieldError } from 'rc-field-form/es/interface';
import { useSignUpUserMutation } from '@redux/utils/api';
import { ISignUpData } from '../../../../types';
import { history } from '@redux/configure-store';
import { AppDispatch, RootState, useAppDispatch } from '@redux/configure-store';
import { setIsLoading, setUserData } from '@redux/reducers/appReducer';
import { useSelector } from 'react-redux';

export const SignUpContent: React.FC = () => {
    const breakpoint = useBreakpoint();
    const [form] = Form.useForm();
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [isFirstValidation, setIsFirstValidation] = useState<boolean>(true);
    const [signUpUser, { isLoading }] = useSignUpUserMutation();
    const dispatch: AppDispatch = useAppDispatch();
    const userData = useSelector((state: RootState) => state.app.userData);
    const router = useSelector((state: RootState) => state.router);

    useEffect(() => {
        if (isLoading) {
            dispatch(setIsLoading(true));
        } else {
            dispatch(setIsLoading(false));
        }
    }, [dispatch, isLoading]);

    const onFinish = (values: ISignUpData) => {
        const { email, password } = values;
        dispatch(setUserData(values));
        
        signUpUser({ email, password })
            .unwrap()
            .then(() => {
                history.push(RouterPath.SIGN_UP_RESULT_SUCCESS);            
            })
            .catch((status) => {
                history.push(RouterPath.SIGN_IN_RESULT_ERROR);
            });
    };

    function fieldIsEmpty(field: FieldError) {
        const fieldValue = form.getFieldValue(field.name.join('.'));
        return fieldValue === undefined || [].concat(fieldValue).join().trim() === '';
    }

    function fieldHasError(field: FieldError) {
        return field.errors.length > 0;
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
            name='register'
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
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
                        {TEXT.button.signUpUsingGoogle}
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};
