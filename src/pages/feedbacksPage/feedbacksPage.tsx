import { MainLayout } from '@layouts/mainLayout';
import { useEffect } from 'react';
import { AppDispatch, RootState, history, useAppDispatch } from '@redux/configure-store';
import {
    ErrorCodes,
    RequestResult,
    RouterPath,
    TOKEN_STORAGE_PROPERTY,
} from '@constants/constants';
import { useSelector } from 'react-redux';
import { ContentWithFeedbacks } from './components/contentWithFeedbacks';
import { ContentWithoutFeedbacks } from './components/contentWithoutFeedbacks';
import { HeaderComponent } from './components/headerComponent';
import { FooterComponent } from './components/footerComponent';
import { useGetFeedbacksQuery } from '@redux/utils/api';
import { ModalComponent } from '@pages/ui/modalComponent';
import { FeedbackModal } from './components/feedbackModal';
import { LoaderComponent as Loader } from '@pages/ui/loader';
import { setIsErrorModal, setRequestResult } from '@redux/reducers/appReducer';
import { ErrorType } from '../../types';
import { redirectToLogin } from '@utils/index';

export const FeedbacksPage: React.FC = () => {
    const { data, error, isSuccess, isFetching } = useGetFeedbacksQuery('');
    const isFeedbackModal = useSelector((state: RootState) => state.app.isFeedbackModal);
    const isErrorModal = useSelector((state: RootState) => state.app.isErrorModal);
    const dispatch: AppDispatch = useAppDispatch();

    useEffect(() => {
        const token =
            localStorage.getItem(TOKEN_STORAGE_PROPERTY) ||
            sessionStorage.getItem(TOKEN_STORAGE_PROPERTY);
        if (!token) {
            redirectToLogin();
        } else {
            if (error) {
                const e = error as ErrorType;
                if (e.status === ErrorCodes.FORBIDDEN) {
                    dispatch(setRequestResult(RequestResult.ERROR_403));
                    dispatch(setIsErrorModal(true));
                } else {
                    dispatch(setRequestResult(RequestResult.ERROR_403));
                    dispatch(setIsErrorModal(true));
                    history.push(RouterPath.FEEDBACKS);
                }
            }
        }
    });

    return (
        <>
            <MainLayout>
                <HeaderComponent />
                {data && isSuccess ? (
                    <ContentWithFeedbacks data={data} />
                ) : (
                    <ContentWithoutFeedbacks />
                )}
                {data ? <FooterComponent /> : undefined}
            </MainLayout>
            {isFetching && <Loader />}
            {isErrorModal && <ModalComponent />}
            {isFeedbackModal && <FeedbackModal />}
        </>
    );
};
