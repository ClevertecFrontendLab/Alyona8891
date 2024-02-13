import React from 'react';
import cn from 'classnames';

import styles from './mainPage.module.scss';
import { Layout } from 'antd';
import { SiderComponent } from './components/siderComponent';

const { Header, Footer, Content } = Layout;

export const MainPage: React.FC = () => {
    return (
        <div className={styles[cn('wrapper')]}>
            <Layout className={styles[cn('main_layout')]} style={{ backgroundColor: 'inherit' }}>
                <SiderComponent />
                <Layout style={{ backgroundColor: 'inherit' }}>
                    <Header style={{ backgroundColor: 'inherit' }}>Header</Header>
                    <Content style={{ backgroundColor: 'inherit' }}>Content</Content>
                    <Footer style={{ backgroundColor: 'inherit' }}>Footer</Footer>
                </Layout>
            </Layout>
        </div>
    );
};
