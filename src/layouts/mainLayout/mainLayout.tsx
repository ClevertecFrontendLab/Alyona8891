import { useEffect, useState } from 'react';
import cn from 'classnames';

import styles from './mainLayout.module.scss';
import { Layout } from 'antd';
import { LoaderComponent as Loader } from '@pages/ui/loader';
import { SiderComponent } from '@pages/mainPage/components/siderComponent';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/configure-store';
import { ModalComponent } from '@pages/ui/modalComponent';
import { RouterPath } from '@constants/constants';
import { FeedbackModal } from '@pages/feedbacksPage/components/feedbackModal';

export const MainLayout = (props: { children: React.ReactNode }) => {
    const { children } = props;
    const [isLoading, setIsLoading] = useState(true);
    const isErrorModal = useSelector((state: RootState) => state.app.isErrorModal);
    const isFeedbackModal = useSelector((state: RootState) => state.app.isFeedbackModal);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1);
    }, []);

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
            {isLoading && <Loader />}
            {isErrorModal && <ModalComponent />}
            {isFeedbackModal && <FeedbackModal />}
        </>
    );
};
