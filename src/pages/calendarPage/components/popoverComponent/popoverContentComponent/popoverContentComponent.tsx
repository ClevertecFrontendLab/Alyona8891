import { FC, useCallback, useMemo } from 'react';

import { EPopoverStatus, POPOVER } from '@constants/constants';
import { Button, Space } from 'antd';
import { AppDispatch, RootState, useAppDispatch } from '@redux/configure-store';
import { setIsPanelOpened } from '@redux/reducers/appReducer';
import { useSelector } from 'react-redux';
import { useAddTrainingMutation } from '@redux/utils/api';

type TPopoverContentComponentProps = {
    popoverStatus: EPopoverStatus;
    handleChangeStatus: (status: EPopoverStatus) => void;
};

export const PopoverContentComponent: FC<TPopoverContentComponentProps> = ({
    popoverStatus,
    handleChangeStatus,
}) => {
    const savedFormsData = useSelector((state: RootState) => state.app.savedFormsData);
    const editedTraining = useSelector((state: RootState) => state.app.editedTraining);
    const editedDate = useSelector((state: RootState) => state.app.editedDate);

    const [addTraining, { isLoading }] = useAddTrainingMutation();
    const dispatch: AppDispatch = useAppDispatch();

    const handleAddTraining = useCallback(() => {
        handleChangeStatus(EPopoverStatus.ADD_TRAINING);
    }, [handleChangeStatus]);

    const handleAddExercise = useCallback(() => {
        dispatch(setIsPanelOpened(true));
    }, [dispatch]);

    const handleSaveTraining = useCallback(() => {
        console.log('savedData', savedFormsData);
        const exercises = savedFormsData.map((formData) => {
            return {
                name: formData.name as string,
                replays: formData.quantity as number,
                weight: formData.weight as number,
                approaches: formData.time as number,
                isImplementation: false,
            };
        });
        addTraining({
            name: editedTraining,
            date: editedDate?.toISOString() as string,
            exercises: exercises,
        })
            .unwrap()
            .then((res) => {
                console.log('res', res);
            })
            .catch((e) => {
                console.log('err', e);
            });
    }, [addTraining, editedDate, editedTraining, savedFormsData]);

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
                        <Button
                            style={{ width: '100%' }}
                            onClick={handleAddExercise}
                            disabled={!editedTraining}
                        >
                            {POPOVER.addTraining.button1}
                        </Button>
                        <Button
                            style={{ width: '100%' }}
                            type='link'
                            disabled={!(savedFormsData.length > 0)}
                            onClick={handleSaveTraining}
                        >
                            {POPOVER.addTraining.button2}
                        </Button>
                    </>
                );
            default:
        }
    }, [
        editedTraining,
        handleAddExercise,
        handleAddTraining,
        handleSaveTraining,
        popoverStatus,
        savedFormsData.length,
    ]);

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
