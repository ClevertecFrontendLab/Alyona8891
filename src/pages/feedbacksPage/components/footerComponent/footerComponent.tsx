import cn from 'classnames';
import styles from './footerComponent.module.scss';

import { Button, Space } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import { AppDispatch, RootState, useAppDispatch } from '@redux/configure-store';
import { setIsAllFeedbacksVisible, setIsFeedbackModal } from '@redux/reducers/appReducer';
import { CONTENT_WITH_FEEDBACKS } from '@constants/constants';
import { useSelector } from 'react-redux';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

export const FooterComponent: React.FC = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const breakpoint = useBreakpoint();
    const isAllFeedbacksVisible = useSelector(
        (state: RootState) => state.app.isAllFeedbacksVisible,
    );

    const handleWriteFeedback = () => {
        dispatch(setIsFeedbackModal(true));
    };

    const handleShowAllFeedbacks = () => {
        dispatch(setIsAllFeedbacksVisible());
    };

    return (
        <Footer className={styles[cn('wrapper')]}>
            <Space
                size={'large'}
                className={styles[cn('container')]}
                direction={breakpoint.xs ? 'vertical' : 'horizontal'}
            >
                <Button
                    data-test-id='write-review'
                    className={styles[cn('button')]}
                    onClick={handleWriteFeedback}
                    type='primary'
                    size='large'
                >
                    {CONTENT_WITH_FEEDBACKS.buttons.button1}
                </Button>
                <Button
                    data-test-id='all-reviews-button'
                    className={styles[cn('button')]}
                    onClick={handleShowAllFeedbacks}
                    type='link'
                    size='large'
                >
                    {isAllFeedbacksVisible
                        ? CONTENT_WITH_FEEDBACKS.buttons.button3
                        : CONTENT_WITH_FEEDBACKS.buttons.button2}
                </Button>
            </Space>
        </Footer>
    );
};
