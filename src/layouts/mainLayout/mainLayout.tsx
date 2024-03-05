import { FC, useEffect } from 'react';
import cn from 'classnames';

import styles from './mainLayout.module.scss';
import { Layout } from 'antd';
import { SiderComponent } from '@pages/mainPage/components/siderComponent';
import { useSelector } from 'react-redux';
import { AppDispatch, useAppDispatch } from '@redux/configure-store';
import { RouterPath, TOKEN_STORAGE_PROPERTY } from '@constants/constants';
import { redirectToLogin, routerSelector } from '@utils/index';

export const MainLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useSelector(routerSelector);
    const dispatch: AppDispatch = useAppDispatch();

    useEffect(() => {
        window.addEventListener('beforeunload', function () {
            sessionStorage.clear();
        });
        if (router.location?.pathname === RouterPath.FEEDBACKS) {
            const token =
                localStorage.getItem(TOKEN_STORAGE_PROPERTY) ||
                sessionStorage.getItem(TOKEN_STORAGE_PROPERTY);
            if (!token) {
                redirectToLogin();
            }
        }
        if (router.location?.pathname === RouterPath.MAIN) {
            const token =
                localStorage.getItem(TOKEN_STORAGE_PROPERTY) ||
                sessionStorage.getItem(TOKEN_STORAGE_PROPERTY);
            if (!token) {
                redirectToLogin();
            }
        }
    }, [dispatch, router.location?.pathname]);

    return (
        <div className={styles[cn('wrapper')]}>
            <Layout className={styles[cn('main_layout')]} style={{ backgroundColor: 'inherit' }}>
                <SiderComponent />
                <Layout
                    className={styles[cn('main')]}
                    style={{ backgroundColor: 'inherit', height: '100%' }}
                >
                    {children}
                </Layout>
            </Layout>
        </div>
    );
};
