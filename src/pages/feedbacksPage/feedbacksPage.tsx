import { MainLayout } from '@layouts/mainLayout';
import { useEffect } from 'react';
import { history} from '@redux/configure-store';
import { RouterPath } from '@constants/constants';

export const FeedbacksPage: React.FC = () => {
    useEffect(() => {
        const token =
            localStorage.getItem('alyona8891_token') || sessionStorage.getItem('alyona8891_token');
            if(!token) {
                history.push(RouterPath.AUTH);
            }
    })
    return <MainLayout>I'm feedbackPage</MainLayout>;
};
