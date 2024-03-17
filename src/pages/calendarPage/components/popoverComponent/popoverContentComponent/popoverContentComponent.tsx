import { FC, useCallback, useMemo } from 'react';

import { EPopoverStatus, POPOVER } from '@constants/constants';
import { Button, Space } from 'antd';
import { AppDispatch, useAppDispatch } from '@redux/configure-store';
import { setIsPanelOpened } from '@redux/reducers/appReducer';

type TPopoverContentComponentProps = {
    popoverStatus: EPopoverStatus;
    handleChangeStatus: (status: EPopoverStatus) => void;
};

export const PopoverContentComponent: FC<TPopoverContentComponentProps> = ({
    popoverStatus,
    handleChangeStatus,
}) => {
    const dispatch: AppDispatch = useAppDispatch();

    const handleAddTraining = useCallback(() => {
        handleChangeStatus(EPopoverStatus.ADD_TRAINING);
    }, [handleChangeStatus]);

    const handleAddExercise = useCallback(() => {
        dispatch(setIsPanelOpened(true));
    }, [dispatch]);

    const getButtonComponent = useMemo(() => {
        switch (popoverStatus) {
            case EPopoverStatus.WITHOUT_TRAINING:
                return (
                    <Button style={{ width: '100%' }} type='primary' onClick={handleAddTraining}>
                        {POPOVER.withoutTrainings.button}
                    </Button>
                );
            case EPopoverStatus.WITH_TRAINING:
                return (
                    <Button style={{ width: '100%' }} type='primary' onClick={handleAddTraining}>
                        {POPOVER.withTrainings.button}
                    </Button>
                );
            case EPopoverStatus.ADD_TRAINING:
                return (
                    <>
                        <Button style={{ width: '100%' }} onClick={handleAddExercise}>
                            {POPOVER.addTraining.button1}
                        </Button>
                        <Button style={{ width: '100%' }} type='link' disabled>
                            {POPOVER.addTraining.button2}
                        </Button>
                    </>
                );
            default:
        }
    }, [handleAddExercise, handleAddTraining, popoverStatus]);

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
