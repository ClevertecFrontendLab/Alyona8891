import React from 'react';
import cn from 'classnames';

import styles from './signUpContent.module.scss';
import { Button, Form, Input, Space } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, GooglePlusOutlined } from '@ant-design/icons';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { TEXT } from '@constants/index';

export const SignUpContent: React.FC = () => {
    const breakpoint = useBreakpoint();

    return (
        <Form
            className={styles[cn('form')]}
            name='basic'
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={() => {}}
            onFinishFailed={() => {}}
            autoComplete='off'
            requiredMark={false}
        >
            <Form.Item
                name='username'
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input
                    size='large'
                    className={styles[cn('input')]}
                    addonBefore={TEXT.input.email.label}
                />
            </Form.Item>

            <Form.Item
                name='password'
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password
                    size='large'
                    className={styles[cn('input')]}
                    placeholder={TEXT.input.password.placeholder}
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
                <span className={styles[cn('password_helper')]}>{TEXT.input.password.helper}</span>
            </Form.Item>

            <Form.Item
                name='confirmPassword'
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password
                    size='large'
                    className={styles[cn('input')]}
                    placeholder={TEXT.input.confirmPassword.placeholder}
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
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
