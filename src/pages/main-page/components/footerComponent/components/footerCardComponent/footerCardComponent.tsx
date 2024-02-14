import { Button, Card, Space } from 'antd';
import { IFooterCardsData } from '../../footerComponent';
import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';

export const FooterCardComponent: React.FC<IFooterCardsData> = (props) => {
    const { buttons, info, title } = props;
    return (
        <Card
            bodyStyle={{ padding: '0' }}
            title={
                <Space
                    align='start'
                    size={0}
                    direction='vertical'
                    style={{ display: 'flex', textAlign: 'center', gap: '0px' }}
                >
                    <Title style={title.style} level={5}>
                        {title.text}
                    </Title>
                    <Text style={info.style}>{info.text}</Text>
                </Space>
            }
            style={{ width: 240 }}
        >
            {buttons.map((button) => {
                return (
                    <Button
                        style={{ padding: '0 13px', marginBottom: '10px' }}
                        icon={button.icon}
                        type='text'
                    >
                        {button.text}
                    </Button>
                );
            })}
        </Card>
    );
};
