import { Avatar, Card, Space, Typography } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import cn from 'classnames';
import styles from './feedbackCard.module.scss';
import { UserOutlined } from '@ant-design/icons';
import { CustomRate } from '@pages/ui/customRate';
import { IFeedback } from '../../../../../../types';
const { Text } = Typography;

function addLeadingZero(number: number) {
    return number < 10 ? '0' + number : number;
}

const getDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = addLeadingZero(date.getMonth() + 1);
    const day = addLeadingZero(date.getDate());

    return `${day}.${month}.${year}`;
};

function generateUniqueKey() {
    const timestamp = new Date().getTime();
    const random = Math.random().toString(36).substring(7);
    return `${timestamp}-${random}`;
}

export const FeedbackCard = (props: { feedbackData: IFeedback }) => {
    const { feedbackData } = props;
    const { imageSrc, fullName, rating, createdAt, message } = feedbackData;
    const breakpoint = useBreakpoint();
    const fullNameArr = fullName?.split(' ');

    return (
        <Card
            size='small'
            className={styles[cn('card')]}
            headStyle={{ textAlign: breakpoint.xs ? 'center' : 'start' }}
            style={{ width: '100%' }}
        >
            <Space.Compact
                className={styles[cn('container')]}
                block
                direction={breakpoint.xs ? 'vertical' : 'horizontal'}
            >
                <Space
                    direction={breakpoint.xs ? 'horizontal' : 'vertical'}
                    align='center'
                    style={{ width: '174px' }}
                    size={'middle'}
                >
                    <Avatar
                        size={'large'}
                        src={imageSrc ? imageSrc : undefined}
                        icon={!imageSrc ? <UserOutlined /> : undefined}
                    />
                    <Space direction='vertical' size={0} align={breakpoint.xs ? 'start' : 'center'}>
                        {fullNameArr?.map((name) => (
                            <Text key={generateUniqueKey()} className={styles[cn('text')]}>
                                {name}
                            </Text>
                        ))}
                    </Space>
                </Space>
                <Space direction='vertical' align='start' style={{ flex: '1' }}>
                    <Space direction='horizontal' size={16}>
                        <CustomRate size={16} value={rating} />
                        <Text className={styles[cn('date_text')]}>{getDate(createdAt)}</Text>
                    </Space>
                    <Text type='secondary' style={{ wordBreak: 'break-all' }}>
                        {message}
                    </Text>
                </Space>
            </Space.Compact>
        </Card>
    );
};
