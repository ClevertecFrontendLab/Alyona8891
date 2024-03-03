import cn from 'classnames';
import styles from './contentWithoutFeedbacks.module.scss';
import { Content } from 'antd/lib/layout/layout';
import { Button, Card, Space, Typography } from 'antd';
import { AppDispatch, useAppDispatch } from '@redux/configure-store';
import { setIsFeedbackModal } from '@redux/reducers/appReducer';
const { Text, Title } = Typography;

const CONTENT_WITHOUT_FEEDBACKS = {
    title: 'Оставьте свой отзыв первым',
    text: [
        {
            key: 1,
            part: 'Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении.',
        },
        { key: 2, part: 'Поделитесь своим мнением и опытом с другими пользователями,' },
        { key: 3, part: 'и помогите им сделать правильный выбор.' },
    ],
    button: 'Написать отзыв',
};

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
