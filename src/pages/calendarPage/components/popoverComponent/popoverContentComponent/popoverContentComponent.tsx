import { FC, useMemo } from 'react';

import { EPopoverStatus, POPOVER } from '@constants/constants';
import { Button, Space } from 'antd';

type TPopoverContentComponentProps = {
    popoverStatus: EPopoverStatus;
};

export const PopoverContentComponent: FC<TPopoverContentComponentProps> = ({ popoverStatus }) => {
    const getButtonText = useMemo(() => {
        switch (popoverStatus) {
            case EPopoverStatus.CREATE:
                return POPOVER.withoutTrainings.button;
            case EPopoverStatus.ADD:
              return POPOVER.withTrainings.button;
            default:
        }
    }, [popoverStatus]);

    return (
        <Space
            direction='vertical'
            style={{
                width: '240px',
            }}
        >
            <Button style={{ width: '100%' }} type='primary'>
                {getButtonText}
            </Button>
        </Space>
    );
};
