import { useEffect, useState } from 'react';
import cn from 'classnames';

import styles from './mainLayout.module.scss';
import { Layout } from 'antd';
import { LoaderComponent as Loader } from '@pages/ui/loader';
import { SiderComponent } from '@pages/mainPage/components/siderComponent';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState, useAppDispatch, history } from '@redux/configure-store';
import { ModalComponent } from '@pages/ui/modalComponent';
import { ErrorCodes, RequestResult, RouterPath } from '@constants/constants';
import { FeedbackModal } from '@pages/feedbacksPage/components/feedbackModal';
import { redirectToLogin } from '@pages/mainPage/components/footerComponent/footerComponent';
import { setFeedbacks, setIsErrorModal, setRequestResult } from '@redux/reducers/appReducer';
import { useGetFeedbacksMutation } from '@redux/utils/api';

export const MainLayout = (props: { children: React.ReactNode }) => {
    const { children } = props;
    const isErrorModal = useSelector((state: RootState) => state.app.isErrorModal);
    const isFeedbackModal = useSelector((state: RootState) => state.app.isFeedbackModal);
    const router = useSelector((state: RootState) => state.router);
    const dispatch: AppDispatch = useAppDispatch();
    const [getFeedbacks, { isLoading: isLoadingFeedbacks }] = useGetFeedbacksMutation();

    useEffect(() => {
        if (router.location?.pathname === RouterPath.FEEDBACKS) {
            const token =
                localStorage.getItem('alyona8891_token') ||
                sessionStorage.getItem('alyona8891_token');
            if (!token) {
                redirectToLogin();
            } else {
                getFeedbacks(token)
                    .unwrap()
                    .then((res) => {
                        dispatch(setFeedbacks([...res]));
                        history.push(RouterPath.FEEDBACKS);
                    })
                    .catch((error) => {
                        if (error.status === ErrorCodes.FORBIDDEN) {
                            redirectToLogin();
                        } else {
                            history.push(RouterPath.FEEDBACKS);
                            dispatch(setRequestResult(RequestResult.ERROR_403));
                            dispatch(setIsErrorModal(true));
                        }
                    });
            }
        }
    }, [dispatch, getFeedbacks, router.location?.pathname]);

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
            {isLoadingFeedbacks && <Loader />}
            {isErrorModal && <ModalComponent />}
            {isFeedbackModal && <FeedbackModal />}
        </>
    );
};
