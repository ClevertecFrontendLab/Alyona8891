import React from 'react';
import cn from 'classnames';

import styles from './mainPage.module.scss';
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

export const MainPage: React.FC = () => {
    return (
        <div className={styles[cn('wrapper')]}>
            <Layout
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100vh',
                    backgroundColor: 'inherit',
                }}
            >
                <Sider style={{ backgroundColor: 'inherit' }}>Sider</Sider>
                <Layout style={{ backgroundColor: 'inherit' }}>
                    <Header style={{ backgroundColor: 'inherit' }}>Header</Header>
                    <Content style={{ backgroundColor: 'inherit' }}>Content</Content>
                    <Footer style={{ backgroundColor: 'inherit' }}>Footer</Footer>
                </Layout>
            </Layout>
        </div>
    );
};
