import Lottie from 'lottie-react';
import cn from 'classnames';

import styles from './loader.module.scss';
import animation from './animation.json';

export const LoaderComponent: React.FC = () => {
    return (
        <div className={styles[cn('wrapper')]}>
            <Lottie data-test-id='loader'
                height={150}
                width={150}
                animationData={animation}
                loop={true}
                className={styles[cn('loader')]}
            />
        </div>
    );
};
