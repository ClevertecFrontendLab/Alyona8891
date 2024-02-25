import React, { useState } from 'react';
import cn from 'classnames';

import styles from './signInContent.module.scss';
import { Anchor, Button, Checkbox, Form, Input, Space, Typography } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined, GooglePlusOutlined } from '@ant-design/icons';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { TEXT, VALIDATION_RULES } from '@constants/index';
import { FieldError } from 'rc-field-form/es/interface';
const { Link } = Anchor;

export const SignInContent: React.FC = () => {
    const breakpoint = useBreakpoint();
    const [form] = Form.useForm();
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [isFirstValidation, setIsFirstValidation] = useState<boolean>(true);

    const onFinish = (values: string) => {
        console.log('Received values of form: ', values);
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
            name='basic'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={() => {}}
            autoComplete='off'
            onFieldsChange={isValid}
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
                    { min: 8, message: '' },
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
                <Checkbox defaultChecked>{TEXT.input.rememberMeCheckbox.label}</Checkbox>
                <Anchor affix={false}>
                    <Typography.Link>
                        <Link href='' title={TEXT.link.forgetPassword} />
                    </Typography.Link>
                </Anchor>
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
