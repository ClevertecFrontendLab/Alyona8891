import React from 'react';
import cn from 'classnames';

import styles from './mainPage.module.scss';
import { Layout } from 'antd';
import { SiderComponent } from './components/siderComponent';
import { HeaderComponent } from './components/headerComponent';
import { ContentComponent } from './components/contentComponent';
import { FooterComponent } from './components/footerComponent';

export const MainPage: React.FC = () => {
    return (
        <div className={styles[cn('wrapper')]}>
            <Layout
                className={styles[cn('main_layout')]}
                style={{ backgroundColor: 'inherit' }}
            >
                <SiderComponent />
                <Layout style={{ backgroundColor: 'inherit', height: '100%' }}>
                    <HeaderComponent />
                    <ContentComponent />
                    <FooterComponent />
                </Layout>
            </Layout>
        </div>
    );
};
