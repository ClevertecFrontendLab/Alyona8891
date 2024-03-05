import { useEffect } from 'react';
import cn from 'classnames';

import styles from './mainLayout.module.scss';
import { Layout } from 'antd';
import { SiderComponent } from '@pages/mainPage/components/siderComponent';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState, useAppDispatch } from '@redux/configure-store';
import { RouterPath } from '@constants/constants';
import { redirectToLogin } from '@utils/index';

export const MainLayout = (props: { children: React.ReactNode }) => {
    const { children } = props;

    const router = useSelector((state: RootState) => state.router);
    const dispatch: AppDispatch = useAppDispatch();

    useEffect(() => {
        window.addEventListener('beforeunload', function () {
            sessionStorage.clear();
        });
        if (router.location?.pathname === RouterPath.FEEDBACKS) {
            const token =
                localStorage.getItem('alyona8891_token') ||
                sessionStorage.getItem('alyona8891_token');
            if (!token) {
                redirectToLogin();
            }
        }
        if (router.location?.pathname === RouterPath.MAIN) {
            const token =
                localStorage.getItem('alyona8891_token') ||
                sessionStorage.getItem('alyona8891_token');
            if (!token) {
                redirectToLogin();
            }
        }
    }, [dispatch, router.location?.pathname]);

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
                        {children}
                    </Layout>
                </Layout>
            </div>
        </>
    );
};
