import { FC, useState } from 'react';
import { Badge, BadgeProps, Button, Popover, Space, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const { Text } = Typography;

type TPopoverComponentProps = {
    listData: {
        type: string,
        content: string,
    }[];
    currentDate: string,
    children: React.ReactNode,
};

export const PopoverComponent: FC<TPopoverComponentProps> = ({ listData, currentDate, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenChange = (newOpen: boolean) => {
      setIsOpen(newOpen);
    };

    return (
        <Popover
            showArrow={false}
            open={isOpen}
            onOpenChange={handleOpenChange}
            title={() => (
                <Space
                    direction='vertical'
                    style={{
                        width: '240px',
                        paddingTop: '0.7rem',
                    }}
                    size={0.5}
                >
                    <Text strong>{`Тренировки на ${currentDate}`}</Text>
                    <Text type='secondary'>Нет активных тренировок</Text>
                    <Space
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '64px',
                        }}
                    >
                        {listData.length > 0 ? (
                            listData.map((item) => (
                                <li key={item.content}>
                                    <Badge
                                        status={item.type as BadgeProps['status']}
                                        text={item.content}
                                    />
                                </li>
                            ))
                        ) : (
                            <img src='src/assets/images/empty_image.svg' />
                        )}
                    </Space>
                    <Button
                        type='link'
                        icon={<CloseOutlined />}
                        onClick={() => {
                            setIsOpen(false);
                        }}
                        style={{ position: 'absolute', top: '0.6rem', right: '0.5rem' }}
                    />
                </Space>
            )}
            content={() => (
                <Space
                    direction='vertical'
                    style={{
                        width: '240px',
                    }}
                >
                    <Button style={{ width: '100%' }} type='primary'>
                        Создать тренировку
                    </Button>
                </Space>
            )}
            align={{ offset: [-7, 172] }}
            trigger='click'
            placement='topLeft'
        >
            {children}
        </Popover>
    );
};
