import cn from 'classnames';
import styles from './contentWithoutFeedbacks.module.scss';
import { Content } from 'antd/lib/layout/layout';
import { Button, Card, Space, Typography } from 'antd';
import { AppDispatch, useAppDispatch } from '@redux/configure-store';
import { setIsFeedbackModal } from '@redux/reducers/appReducer';
import { CONTENT_WITHOUT_FEEDBACKS } from '@constants/constants';
const { Text, Title } = Typography;

export const ContentWithoutFeedbacks = () => {
    const dispatch: AppDispatch = useAppDispatch();

    const handleWriteFeedback = () => {
        dispatch(setIsFeedbackModal(true));
    };

    return (
        <Content className={styles[cn('wrapper')]}>
            <Card className={styles[cn('card')]} headStyle={{ textAlign: 'center' }}>
                <Title className={styles[cn('title')]} level={3}>
                    {CONTENT_WITHOUT_FEEDBACKS.title}
                </Title>
                <Space direction='vertical' size={0}>
                    {CONTENT_WITHOUT_FEEDBACKS.text.map((text) => (
                        <Text className={styles[cn('text')]} key={text.key} type='secondary'>
                            {text.part}
                        </Text>
                    ))}
                </Space>
            </Card>
            <Button
                className={styles[cn('button')]}
                onClick={handleWriteFeedback}
                type='primary'
                size='large'
            >
                {CONTENT_WITHOUT_FEEDBACKS.button}
            </Button>
        </Content>
    );
};
