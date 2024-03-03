import { MainLayout } from '@layouts/mainLayout';
import { useEffect } from 'react';
import { RootState, history } from '@redux/configure-store';
import { RouterPath } from '@constants/constants';
import { useSelector } from 'react-redux';
import { ContentWithFeedbacks } from './components/contentWithFeedbacks';
import { ContentWithoutFeedbacks } from './components/contentWithoutFeedbacks';
import { HeaderComponent } from './components/headerComponent';
import { FooterComponent } from './components/footerComponent';

export const FeedbacksPage: React.FC = () => {
    const feedbacks = useSelector((state: RootState) => state.app.feedbacks);

    useEffect(() => {
        const token =
            localStorage.getItem('alyona8891_token') || sessionStorage.getItem('alyona8891_token');
        if (!token) {
            history.push(RouterPath.AUTH);
        }
    });

    return (
        <MainLayout>
            <HeaderComponent />
            {feedbacks.length > 0 ? <ContentWithFeedbacks /> : <ContentWithoutFeedbacks />}
            {feedbacks.length > 0 ? <FooterComponent /> : undefined}
        </MainLayout>
    );
};
