import React from 'react';
import cn from 'classnames';

import styles from './signInContent.module.scss';
import { Anchor, Button, Checkbox, Form, Input, Space, Typography } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, GooglePlusOutlined } from '@ant-design/icons';
const { Link } = Anchor;

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
                <Input size='large' className={styles[cn('input')]} addonBefore='e-mail:' />
            </Form.Item>

            <Form.Item
                name='password'
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password
                    size='large'
                    placeholder='Пароль'
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
            </Form.Item>

            <Space
                className={styles[cn('checkbox_container')]}
                direction='horizontal'
                align='center'
                size='large'
            >
                <Checkbox defaultChecked>Запомнить меня</Checkbox>
                <Anchor affix={true}>
                    <Typography.Link>
                        <Link href='#' title='Забыли пароль?' />
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
                    >
                        Войти
                    </Button>
                    <Button
                        className={styles[cn('button')]}
                        size='large'
                        icon={<GooglePlusOutlined />}
                    >
                        Войти через Google
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};
