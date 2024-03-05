import cn from 'classnames';
import styles from './contentWithFeedbacks.module.scss';

import { Content } from 'antd/lib/layout/layout';
import { FeedbackCard } from './components/feedbackCard';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState, useAppDispatch } from '@redux/configure-store';
import { useEffect } from 'react';
import { useGetFeedbacksMutation } from '@redux/utils/api';
import { setFeedbacks } from '@redux/reducers/appReducer';
import { ErrorCodes } from '@constants/constants';
import { Space } from 'antd';

export const ContentWithFeedbacks = () => {
    const data = useSelector((state: RootState) => state.app.feedbacks);
    const dispatch: AppDispatch = useAppDispatch();
    const [getFeedbacks, { isLoading: isLoadingFeedbacks }] = useGetFeedbacksMutation();
    
    const isAllFeedbacksVisible = useSelector(
        (state: RootState) => state.app.isAllFeedbacksVisible,
    );

    return (
        <Content className={styles[cn('wrapper')]}>
            {isAllFeedbacksVisible ? (
                <Space size={20} direction='vertical' className={styles[cn('container')]}>
                    {data.map((feedback) => (
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
