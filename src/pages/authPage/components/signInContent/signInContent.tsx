import React from 'react';
import cn from 'classnames';

import styles from './signInContent.module.scss';
import { Button, Checkbox, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

export const SignInContent: React.FC = () => {
    return (
        <Form
            className={styles[cn('form')]}
            name='basic'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={() => {}}
            onFinishFailed={() => {}}
            autoComplete='off'
        >
            <Form.Item
                name='username'
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input className={styles[cn('input')]} addonBefore='e-mail:' />
            </Form.Item>

            <Form.Item
                name='password'
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password
                    placeholder='Пароль'
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
            </Form.Item>

            <Form.Item name='remember' valuePropName='checked' wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Запомнить меня</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type='primary' htmlType='submit'>
                    Войти
                </Button>
            </Form.Item>
        </Form>
    );
};
