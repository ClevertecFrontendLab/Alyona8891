import { FC, useEffect } from 'react';
import cn from 'classnames';
import { Outlet } from 'react-router-dom';

import styles from './authContentLayout.module.scss';
import { Tabs } from 'antd';
import { AppDispatch, RootState, useAppDispatch } from '@redux/configure-store';
import { useSelector } from 'react-redux';
import { RouterPath, TEXT } from '@constants/constants';
import { setAuthPageContent } from '@redux/reducers/appReducer';
import { history } from '@redux/configure-store';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { routerSelector } from '@utils/index';

export const AuthContentLayout: FC = () => {
    const activeKey = useSelector((state: RootState) => state.app.authPageContent);
    const dispatch: AppDispatch = useAppDispatch();
    const breakpoint = useBreakpoint();
    const router = useSelector(routerSelector);

    const onChange = () => {
        if (activeKey === 'signIn') {
            dispatch(setAuthPageContent('signUp'));
            history.push(RouterPath.SIGN_UP);
        } else {
            dispatch(setAuthPageContent('signIn'));
            history.push(RouterPath.SIGN_IN);
        }
    };

    useEffect(() => {
        if (router.location?.pathname === RouterPath.SIGN_UP) {
            dispatch(setAuthPageContent('signUp'));
        } else if (router.location?.pathname === RouterPath.SIGN_IN) {
            dispatch(setAuthPageContent('signIn'));
        }
    }, [dispatch, router.location?.pathname]);

    return (
        <section
            className={cn([styles.container], {
                [styles.container_sign_up]: activeKey === 'signUp',
                [styles.container_sign_in]: activeKey === 'signIn',
            })}
        >
            <div className={styles[cn('logo_block')]}>
                <img
                    className={styles[cn('logo')]}
                    alt='logo'
                    src='/src/assets/images/logo_long.svg'
                />
            </div>
            <Tabs
                centered
                size={breakpoint.xs && !breakpoint.sm ? 'small' : 'large'}
                activeKey={activeKey}
                onChange={onChange}
                items={[
                    {
                        label: TEXT.tabs.signIn,
                        key: 'signIn',
                    },
                    {
                        label: TEXT.tabs.signUp,
                        key: 'signUp',
                    },
                ]}
            />
            <Outlet />
        </section>
    );
};
