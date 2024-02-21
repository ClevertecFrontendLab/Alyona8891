import React from 'react';
import cn from 'classnames';

import styles from './authPage.module.scss';

export const AuthPage: React.FC = () => {
    return (
        <div className={styles[cn('wrapper')]}>
            <section className={styles[cn('container')]}>
                <div className={styles[cn('logo_block')]}>
                    <img
                        className={styles[cn('logo')]}
                        alt='logo'
                        src='/src/assets/images/logo_long.svg'
                    />
                </div>
            </section>
        </div>
    );
};
