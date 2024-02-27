import Lottie from 'lottie-react';
import cn from 'classnames';

import styles from './loader.module.scss';
import React from 'react';
import loader from './loader.json';

export const Loader: React.FC = () => {
    return (
        <div className={styles[cn('wrapper')]}>
            <Lottie data-test-id='loader'
                height={150}
                width={150}
                animationData={loader}
                loop={true}
                className={styles[cn('loader')]}
            />
        </div>
    );
};
