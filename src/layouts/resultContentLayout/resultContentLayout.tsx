import React from 'react';
import cn from 'classnames';
import { Outlet } from 'react-router-dom';

import styles from './resultContentLayout.module.scss';

export const ResultContentLayout: React.FC = () => {

    return (
        <section className={styles[cn('container')]}>
            <Outlet />
        </section>
    );
};
