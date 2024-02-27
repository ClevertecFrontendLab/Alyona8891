import { useEffect, useState } from 'react';
import cn from 'classnames';

import styles from './mainPage.module.scss';
import { Layout } from 'antd';
import { SiderComponent } from './components/siderComponent';
import { HeaderComponent } from './components/headerComponent';
import { ContentComponent } from './components/contentComponent';
import { FooterComponent } from './components/footerComponent';
import { LoaderComponent as Loader } from '@ui/loader';

export const MainPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1);
    }, []);

    return (
        <>
            <div className={styles[cn('wrapper')]}>
                <Layout
                    className={styles[cn('main_layout')]}
                    style={{ backgroundColor: 'inherit' }}
                >
                    <SiderComponent />
                    <Layout
                        className={styles[cn('main')]}
                        style={{ backgroundColor: 'inherit', height: '100%' }}
                    >
                        <HeaderComponent />
                        <ContentComponent />
                        <FooterComponent />
                    </Layout>
                </Layout>
            </div>
            {isLoading && <Loader />}
        </>
    );
};
