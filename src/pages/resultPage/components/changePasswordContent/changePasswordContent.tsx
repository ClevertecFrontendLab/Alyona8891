import { AppDispatch, RootState, useAppDispatch, history } from '@redux/configure-store';
import { Button, Form, Input } from 'antd';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { FieldError } from 'rc-field-form/es/interface';
import styles from './changePasswordContent.module.scss';
import { useChangePasswordMutation } from '@redux/utils/api';
import { useCallback, useEffect, useState } from 'react';
import { setIsLoading, setNewPassword } from '@redux/reducers/appReducer';
import { CHANGE_PASSWORD_CONTENT, RouterPath, VALIDATION_RULES } from '@constants/constants';
import Title from 'antd/lib/typography/Title';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

export const ChangePasswordContent = () => {
    const [changePassword, { isLoading }] = useChangePasswordMutation();
    const dispatch: AppDispatch = useAppDispatch();
    const [form] = Form.useForm();
    const [isFirstValidation, setIsFirstValidation] = useState<boolean>(true);
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const newPassword = useSelector((state: RootState) => state.app.newPassword);
    const router = useSelector((state: RootState) => state.router);

    useEffect(() => {
        if (isLoading) {
            dispatch(setIsLoading(true));
        } else {
            dispatch(setIsLoading(false));
        }
    }, [dispatch, isLoading]);

    const onFinish = useCallback(
        (values: { password: string; confirmPassword: string }) => {
            dispatch(setNewPassword(values.password));

            changePassword(values)
                .unwrap()
                .then(() => {
                    dispatch(setNewPassword(values.password));
                    history.push(RouterPath.SIGN_IN_CHANGE_PASSWORD_SUCCESS);
                })
                .catch(() => {
                    history.push(RouterPath.SIGN_IN_CHANGE_PASSWORD_ERRORS);
                });
        },
        [changePassword, dispatch],
    );

    useEffect(() => {
        console.log(newPassword);
        if (
            newPassword &&
            router.previousLocations &&
            router.previousLocations?.length > 0 &&
            router.previousLocations[1].location?.pathname ===
                RouterPath.SIGN_IN_CHANGE_PASSWORD_ERRORS
        ) {
            onFinish({ password: newPassword, confirmPassword: newPassword });
        }
    }, [newPassword, onFinish, router, router.previousLocations]);

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
            onFinish={onFinish}
            onFinishFailed={(error) => {
                console.log({ error });
            }}
            autoComplete='off'
            requiredMark={false}
            onFieldsChange={isValid}
        >
            <Form.Item>
                <Title level={3}>{CHANGE_PASSWORD_CONTENT.title}</Title>
            </Form.Item>
            <Form.Item
                name='password'
                help={
                    <span className={styles[cn(`password_helper`)]}>
                        {CHANGE_PASSWORD_CONTENT.inputHelper}
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
                    data-test-id='change-password'
                    size='large'
                    className={styles[cn('input')]}
                    placeholder={CHANGE_PASSWORD_CONTENT.inputsPlaceholders.input1}
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
                    data-test-id='change-confirm-password'
                    size='large'
                    className={styles[cn('input')]}
                    placeholder={CHANGE_PASSWORD_CONTENT.inputsPlaceholders.input2}
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
                <Button
                    data-test-id='change-submit-button'
                    className={styles[cn('button')]}
                    size='large'
                    type='primary'
                    htmlType='submit'
                    disabled={isDisabled}
                >
                    {CHANGE_PASSWORD_CONTENT.button}
                </Button>
            </Form.Item>
        </Form>
    );
};
