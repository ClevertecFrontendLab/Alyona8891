import cn from 'classnames';
import styles from './contentWithFeedbacks.module.scss';

import { Content } from 'antd/lib/layout/layout';
import { FeedbackCard } from './components/feedbackCard';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/configure-store';
import { Space } from 'antd';
import { Feedback } from '../../../../types';

export const ContentWithFeedbacks = (props: { data: Feedback[] }) => {
    const { data } = props;

    const isAllFeedbacksVisible = useSelector(
        (state: RootState) => state.app.isAllFeedbacksVisible,
    );

    return (
        <Content className={styles[cn('wrapper')]}>
            {isAllFeedbacksVisible ? (
                <Space size={20} direction='vertical' className={styles[cn('container')]}>
                    {[...data].reverse().map((feedback) => (
                        <FeedbackCard key={feedback.id} feedbackData={feedback} />
                    ))}
                </Space>
            ) : (
                data
                    .slice(-4)
                    .reverse()
                    .map((feedback) => <FeedbackCard key={feedback.id} feedbackData={feedback} />)
            )}
        </Content>
    );
};
