import { Button, Card, Space } from 'antd';
import { IFooterCardsData } from '../footerComponent';
import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';
import cn from 'classnames';

import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import styles from './footerCardComponent.module.scss';

export const FooterCardComponent: React.FC<IFooterCardsData> = (props) => {
    const { buttons, info, title } = props;

    const breakpoint = useBreakpoint();

    return (
        <Card
            className={styles[cn('card')]}
            bodyStyle={{ padding: '0', display: 'flex', justifyContent: 'space-between' }}
            title={
                <Space
                    align={breakpoint.xs ? 'center' : 'start'}
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
        >
            {buttons.map((button, i) => {
                return (
                    <Button
                        key={i}
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
