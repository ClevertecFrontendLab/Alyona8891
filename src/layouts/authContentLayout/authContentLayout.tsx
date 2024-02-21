import React from 'react';
import cn from 'classnames';
import { Outlet } from 'react-router-dom';

import styles from './authContentLayout.module.scss';

export const AuthContentLayout: React.FC = () => {
    return (
        <section className={styles[cn('container')]}>
            <div className={styles[cn('logo_block')]}>
                <img
                    className={styles[cn('logo')]}
                    alt='logo'
                    src='/src/assets/images/logo_long.svg'
                />
            </div>
            <Outlet />
        </section>
    );
};
