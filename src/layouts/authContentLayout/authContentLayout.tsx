import React from 'react';
import cn from 'classnames';
import { Outlet, useNavigate } from 'react-router-dom';

import styles from './authContentLayout.module.scss';
import { Tabs } from 'antd';
import { AppDispatch, RootState, useAppDispatch } from '@redux/configure-store';
import { useSelector } from 'react-redux';
import { RouterPath } from '@constants/constants';
import { changeAuthPageContent } from '@redux/reducers/appReducer';

const TABS_LABELS = {
    signIn: 'Вход',
    signUp: 'Регистрация',
};


export const AuthContentLayout: React.FC = () => {
    const activeKey = useSelector((state: RootState) => state.app.authPageContent);
    const dispatch: AppDispatch = useAppDispatch();

    const navigate = useNavigate();

    const onChange = () => {
        if(activeKey === 'signIn') {
            dispatch(changeAuthPageContent());
            navigate(RouterPath.SIGN_UP)
        } else {
            dispatch(changeAuthPageContent());
            navigate(RouterPath.SIGN_IN);
        }
    };

    return (
        <section className={styles[cn('container')]}>
            <div className={styles[cn('logo_block')]}>
                <img
                    className={styles[cn('logo')]}
                    alt='logo'
                    src='/src/assets/images/logo_long.svg'
                />
            </div>
            <Tabs
                    centered
                    size='large'
                    defaultActiveKey={activeKey}
                    onChange={onChange}
                    items={[
                        {
                            label: TABS_LABELS.signIn,
                            key: '1',
                        },
                        {
                            label: TABS_LABELS.signUp,
                            key: '2',
                        },
                    ]}
                />
                <Outlet />
        </section>
    );
};
