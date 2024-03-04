import cn from 'classnames';
import styles from './contentWithFeedbacks.module.scss';

import { Content } from 'antd/lib/layout/layout';
import { FeedbackCard } from './components/feedbackCard';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/configure-store';

export const ContentWithFeedbacks = () => {
    const data = useSelector((state: RootState) => state.app.feedbacks);
    return (
        <Content className={styles[cn('wrapper')]}>
            {data.map((feedback) => (
                <FeedbackCard key={feedback.id} feedbackData={feedback} />
            ))}
        </Content>
    );
};
