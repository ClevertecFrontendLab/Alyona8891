import { FC, useCallback, useMemo } from 'react';

import {
    EErrorAction,
    EPanelStatus,
    EPopoverStatus,
    POPOVER,
    initialFormData,
} from '@constants/constants';
import { Button, Space } from 'antd';
import { AppDispatch, RootState, useAppDispatch } from '@redux/configure-store';
import {
    setEditedTraining,
    setFormsData,
    setIsPanelOpened,
    setPanelStatus,
    setSavedFormsData,
} from '@redux/reducers/appReducer';
import { useSelector } from 'react-redux';
import { useAddTrainingMutation, useEditTrainingMutation } from '@redux/utils/api';
import { useCalendarModalConfig } from '@hooks/useCalendarModalConfig';
import modal from 'antd/lib/modal';

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
    const panelStatus = useSelector((state: RootState) => state.app.panelStatus);

    const [addTraining, { isLoading }] = useAddTrainingMutation();
    const [editTraining, { isLoading: isEditLoading }] = useEditTrainingMutation();
    const dispatch: AppDispatch = useAppDispatch();
    const config = useCalendarModalConfig(modal, EErrorAction.SAVE);

    const handleAddTraining = useCallback(() => {
        dispatch(setPanelStatus(EPanelStatus.CREATE));
        handleChangeStatus(EPopoverStatus.ADD_TRAINING);
    }, [dispatch, handleChangeStatus]);

    const handleAddExercise = useCallback(() => {
        dispatch(setIsPanelOpened(true));
    }, [dispatch]);

    const getHandleSaveTraining = useCallback(() => {
        const exercises = savedFormsData.map((formData) => {
            return {
                name: formData.name as string,
                replays: formData.quantity as number,
                weight: formData.weight as number,
                approaches: formData.time as number,
                isImplementation: false,
            };
        });
        const currentDate = new Date();
        const compareDate = new Date(editedDate?.ISO as string);
        const isImplementation = compareDate < currentDate ? true : false;
        switch (panelStatus) {
            case EPanelStatus.CREATE:
                return addTraining({
                    name: editedTraining?.name as string,
                    date: editedDate?.ISO as string,
                    exercises: exercises,
                })
                    .unwrap()
                    .then(() => {
                        handleChangeStatus(EPopoverStatus.WITH_TRAINING);
                        dispatch(setFormsData([initialFormData]));
                        dispatch(setSavedFormsData([]));
                        dispatch(setEditedTraining(null));
                    })
                    .catch(() => {
                        modal.error(config);
                    });
            case EPanelStatus.EDIT:
                return editTraining({
                    _id: editedTraining?._id as string,
                    name: editedTraining?.name as string,
                    date: editedDate?.ISO as string,
                    exercises: exercises,
                    isImplementation,
                })
                    .unwrap()
                    .then(() => {
                        handleChangeStatus(EPopoverStatus.WITH_TRAINING);
                        dispatch(setFormsData([initialFormData]));
                        dispatch(setSavedFormsData([]));
                        dispatch(setEditedTraining(null));
                    })
                    .catch(() => {
                        modal.error(config);
                    });
        }
    }, [
        addTraining,
        config,
        dispatch,
        editTraining,
        editedDate?.ISO,
        editedTraining?._id,
        editedTraining?.name,
        handleChangeStatus,
        panelStatus,
        savedFormsData,
    ]);

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
            default:
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
                            onClick={getHandleSaveTraining}
                            loading={isLoading || isEditLoading}
                        >
                            {POPOVER.addTraining.button2}
                        </Button>
                    </>
                );
        }
    }, [
        editedTraining,
        getHandleSaveTraining,
        handleAddExercise,
        handleAddTraining,
        isEditLoading,
        isLoading,
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
