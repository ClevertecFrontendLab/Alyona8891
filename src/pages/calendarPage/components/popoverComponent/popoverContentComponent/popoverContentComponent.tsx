import { FC, useCallback, useMemo } from 'react';

import { EPopoverStatus, POPOVER } from '@constants/constants';
import { Button, Space } from 'antd';

type TPopoverContentComponentProps = {
    popoverStatus: EPopoverStatus;
    handleChangeStatus: (status: EPopoverStatus) => void;
};

export const PopoverContentComponent: FC<TPopoverContentComponentProps> = ({
    popoverStatus,
    handleChangeStatus,
}) => {
    const onClick = useCallback(() => {
        handleChangeStatus(EPopoverStatus.ADD_TRAINING);
    }, [handleChangeStatus]);

    const getButtonComponent = useMemo(() => {
        switch (popoverStatus) {
            case EPopoverStatus.WITHOUT_TRAINING:
                return (
                    <Button style={{ width: '100%' }} type='primary' onClick={onClick}>
                        {POPOVER.withoutTrainings.button}
                    </Button>
                );
            case EPopoverStatus.WITH_TRAINING:
                return (
                    <Button style={{ width: '100%' }} type='primary' onClick={onClick}>
                        {POPOVER.withTrainings.button}
                    </Button>
                );
            case EPopoverStatus.ADD_TRAINING:
                return (
                    <>
                        <Button style={{ width: '100%' }}>
                            {POPOVER.addTraining.button1}
                        </Button>
                        <Button style={{ width: '100%' }} type='link' disabled>
                            {POPOVER.addTraining.button2}
                        </Button>
                    </>
                );
            default:
        }
    }, [onClick, popoverStatus]);

    return (
        <Space
            direction='vertical'
            style={{
                width: '240px',
            }}
        >
            {getButtonComponent}
        </Space>
    );
};
