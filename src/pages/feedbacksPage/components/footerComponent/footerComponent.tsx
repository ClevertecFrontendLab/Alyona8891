import cn from 'classnames';
import styles from './footerComponent.module.scss';

import { Button, Space } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import { AppDispatch, useAppDispatch } from '@redux/configure-store';
import { setIsFeedbackModal } from '@redux/reducers/appReducer';
import { CONTENT_WITH_FEEDBACKS } from '@constants/constants';

export const FooterComponent: React.FC = () => {
    const dispatch: AppDispatch = useAppDispatch();

    const handleWriteFeedback = () => {
        dispatch(setIsFeedbackModal(true));
    };

    const handleShowAllFeedbacks = () => {
        console.log(4);
    };

    return (
        <Footer
            style={{
                backgroundColor: 'inherit',
            }}
        >
            <Space size={'large'}>
                <Button
                    className={styles[cn('button')]}
                    onClick={handleWriteFeedback}
                    type='primary'
                    size='large'
                >
                    {CONTENT_WITH_FEEDBACKS.buttons.button1}
                </Button>
                <Button
                    className={styles[cn('button')]}
                    onClick={handleShowAllFeedbacks}
                    type='link'
                    size='large'
                >
                    {CONTENT_WITH_FEEDBACKS.buttons.button2}
                </Button>
            </Space>
        </Footer>
    );
};
