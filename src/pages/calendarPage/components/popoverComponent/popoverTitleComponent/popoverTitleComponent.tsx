import cn from 'classnames';
import styles from './popoverTitleComponent.module.scss';

import { Badge, Button, Select, Space, Typography } from 'antd';
import type { Moment } from 'moment';
import moment from 'moment';
import { EPanelStatus, EPopoverStatus, POPOVER, initialFormData } from '@constants/constants';
import { ArrowLeftOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import { FC, useCallback, useMemo } from 'react';
import { useDefineTrainingList } from '@hooks/useDefineTrainingList';
import { AppDispatch, RootState, useAppDispatch } from '@redux/configure-store';
import {
    setEditedDate,
    setEditedTraining,
    setFormsData,
    setIsPanelOpened,
    setPanelStatus,
    setSavedFormsData,
} from '@redux/reducers/appReducer';
import { useSelector } from 'react-redux';
import { TUserTraining } from '../../../../../types';
import { defineBadgeColor, generateUniqueKey } from '@utils/index';

const { Text } = Typography;

type TPopoverTitleComponentProps = {
    listData: TUserTraining[];
    currentDate: Moment;
    handleCloseButton: () => void;
    handleBackButton: () => void;
    popoverStatus: EPopoverStatus;
    handleChangeStatus: (status: EPopoverStatus) => void;
};

export const PopoverTitleComponent: FC<TPopoverTitleComponentProps> = ({
    listData,
    currentDate,
    handleCloseButton,
    handleBackButton,
    popoverStatus,
    handleChangeStatus,
}) => {
    const savedFormsData = useSelector((state: RootState) => state.app.savedFormsData);
    const editedTraining = useSelector((state: RootState) => state.app.editedTraining);

    const dispatch: AppDispatch = useAppDispatch();

    const trainingList = useDefineTrainingList(listData);

    const handleTrainingsSelect = useCallback(
        (value: string) => {
            dispatch(setFormsData([initialFormData]));
            dispatch(setSavedFormsData([]));
            dispatch(setEditedTraining({name: value}));
            dispatch(
                setEditedDate({
                    formated: currentDate.format('DD.MM.YYYY'),
                    ISO: moment.utc(currentDate).startOf('day').toISOString(),
                }),
            );
        },
        [currentDate, dispatch],
    );

    const handleEditTraining = useCallback(
        (itemData: TUserTraining) => {
            dispatch(
                setEditedDate({
                    formated: currentDate.format('DD.MM.YYYY'),
                    ISO: moment.utc(currentDate).startOf('day').toISOString(),
                }),
            );
            dispatch(setEditedTraining({name: itemData.name, _id: itemData._id}));
            dispatch(setFormsData(itemData.exercises));
            dispatch(setSavedFormsData(itemData.exercises));
            dispatch(setPanelStatus(EPanelStatus.EDIT));
            handleChangeStatus(EPopoverStatus.EDIT_TRAINING);
        },
        [currentDate, dispatch, handleChangeStatus],
    );

    const handleChangeExercise = useCallback(() => {
        dispatch(setIsPanelOpened(true));
    }, [dispatch]);

    const title = useMemo(() => {
        switch (popoverStatus) {
            case EPopoverStatus.ADD_TRAINING:
                return (
                    <>
                        <Space direction='horizontal' size={0} style={{ display: 'flex' }}>
                            <Button
                                type='link'
                                className={styles[cn('back_button')]}
                                icon={<ArrowLeftOutlined />}
                                onClick={handleBackButton}
                            />
                            <Select
                                style={{ width: '222px' }}
                                defaultValue={POPOVER.addTraining.title}
                                options={trainingList}
                                onChange={handleTrainingsSelect}
                            />
                        </Space>
                    </>
                );
            case EPopoverStatus.EDIT_TRAINING:
                return (
                    <>
                        <Space direction='horizontal' size={0} style={{ display: 'flex' }}>
                            <Button
                                type='link'
                                className={styles[cn('back_button')]}
                                icon={<ArrowLeftOutlined />}
                                onClick={handleBackButton}
                            />
                            <Select
                                style={{ width: '222px' }}
                                defaultValue={editedTraining?.name}
                                options={trainingList}
                                onChange={handleTrainingsSelect}
                            />
                        </Space>
                    </>
                );
            case EPopoverStatus.WITH_TRAINING:
                return (
                    <>
                        <Text strong>{`${POPOVER.withoutTrainings.title} ${currentDate.format(
                            'DD.MM.YYYY',
                        )}`}</Text>
                        <Button
                            type='link'
                            className={styles[cn('close_button')]}
                            icon={<CloseOutlined />}
                            onClick={handleCloseButton}
                        />
                    </>
                );
            default:
                return (
                    <>
                        <Text strong>{`${POPOVER.withoutTrainings.title} ${currentDate.format(
                            'DD.MM.YYYY',
                        )}`}</Text>
                        <Text type='secondary'>{POPOVER.withoutTrainings.text}</Text>
                        <Button
                            type='link'
                            className={styles[cn('close_button')]}
                            icon={<CloseOutlined />}
                            onClick={handleCloseButton}
                        />
                    </>
                );
        }
    }, [
        currentDate,
        editedTraining,
        handleBackButton,
        handleCloseButton,
        handleTrainingsSelect,
        popoverStatus,
        trainingList,
    ]);

    const getContent = useMemo(() => {
        switch (popoverStatus) {
            case EPopoverStatus.WITHOUT_TRAINING:
                return (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            height: '81px',
                        }}
                    >
                        <img src='src/assets/images/empty_image.svg' />
                    </div>
                );
            case EPopoverStatus.WITH_TRAINING:
                return listData.map((item) => (
                    <Space
                        key={generateUniqueKey()}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                        }}
                    >
                        <Badge color={defineBadgeColor(item.name)} text={item.name} />
                        <Button
                            onClick={() => {
                                handleEditTraining(item);
                            }}
                            type='link'
                            icon={<EditOutlined />}
                        />
                    </Space>
                ));
            default:
                return savedFormsData.length > 0 ? (
                    savedFormsData.map((item) => {
                        return (
                            <Space
                                key={generateUniqueKey()}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    width: '100%',
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 500,
                                        color: 'var(--color-info)',
                                    }}
                                >
                                    {item.name}
                                </Text>
                                <Button
                                    onClick={handleChangeExercise}
                                    type='link'
                                    icon={<EditOutlined />}
                                />
                            </Space>
                        );
                    })
                ) : (
                    <div style={{ height: '81px' }}></div>
                );
        }
    }, [popoverStatus, listData, savedFormsData, handleEditTraining, handleChangeExercise]);

    return (
        <Space className={styles[cn('title')]} direction='vertical' size={0.5}>
            {title}
            <div className={styles[cn('container')]}>{getContent}</div>
        </Space>
    );
};
