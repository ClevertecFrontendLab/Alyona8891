import React from 'react';
import cn from 'classnames';

import styles from './authLayout.module.scss';

export const AuthLayout = (props: {children: React.ReactNode}) => {
  const { children } = props;
    return (
        <main className={styles[cn('wrapper')]}>
            {children}
        </main>
    );
};
