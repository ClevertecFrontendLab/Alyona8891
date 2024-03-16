import cn from 'classnames';
import styles from './popoverTitleComponent.module.scss';

import { Badge, BadgeProps, Button, Space, Typography } from 'antd';
import { EPopoverStatus, POPOVER } from '@constants/constants';
import { CloseOutlined } from '@ant-design/icons';
import { FC, useMemo} from 'react';
const { Text } = Typography;

type TPopoverTitleComponentProps = {
    listData: {
        type: string,
        content: string,
    }[];
    currentDate: string,
    handleCloseButton: () => void,
    popoverStatus: EPopoverStatus,
};

export const PopoverTitleComponent: FC<TPopoverTitleComponentProps> = ({
    listData,
    currentDate,
    handleCloseButton,
    popoverStatus,
}) => {
    
    const getPopupTitleContent = useMemo(() => {
        switch (popoverStatus) {
            case EPopoverStatus.CREATE:
                return <img src='src/assets/images/empty_image.svg' />;
            case EPopoverStatus.ADD:
                return listData.map((item) => (
                    <li key={item.content}>
                        <Badge status={item.type as BadgeProps['status']} text={item.content} />
                    </li>
                ));
            default:
        }
    }, [listData, popoverStatus]);

    return (
        <Space className={styles[cn('title')]} direction='vertical' size={0.5}>
            <Text strong>{`${POPOVER.withoutTrainings.title} ${currentDate}`}</Text>
            <Text type='secondary'>{POPOVER.withoutTrainings.text}</Text>
            <Space className={styles[cn('list_container')]}>{getPopupTitleContent}</Space>
            <Button
                type='link'
                className={styles[cn('close_button')]}
                icon={<CloseOutlined />}
                onClick={handleCloseButton}
            />
        </Space>
    );
};
