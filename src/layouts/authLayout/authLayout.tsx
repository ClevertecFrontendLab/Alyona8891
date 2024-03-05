import React, { FC } from 'react';
import cn from 'classnames';

import styles from './authLayout.module.scss';

export const AuthLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
    return <main className={styles[cn('wrapper')]}>{children}</main>;
};
