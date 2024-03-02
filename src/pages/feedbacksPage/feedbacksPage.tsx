import { MainLayout } from '@layouts/mainLayout';
import { useEffect } from 'react';
import { RootState, history } from '@redux/configure-store';
import { RouterPath } from '@constants/constants';
import { useSelector } from 'react-redux';

export const FeedbacksPage: React.FC = () => {
    const feedbacks = useSelector((state: RootState) => state.app.feedbacks);
    useEffect(() => {
        const token =
            localStorage.getItem('alyona8891_token') || sessionStorage.getItem('alyona8891_token');
        if (!token) {
            history.push(RouterPath.AUTH);
        }
    });
    return <MainLayout>
        {feedbacks && feedbacks.map((e) => <div>{e.id}</div>)}
    </MainLayout>;
};
