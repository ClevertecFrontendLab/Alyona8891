import cn from 'classnames';
import styles from './popoverTitleComponent.module.scss';

import { Badge, BadgeProps, Button, Select, Space, Typography } from 'antd';
import type { Moment } from 'moment';
import { EPopoverStatus, POPOVER } from '@constants/constants';
import { ArrowLeftOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import { FC, useCallback, useMemo } from 'react';
import { useDefineTrainingList } from '@hooks/useDefineTrainingList';
import { AppDispatch, RootState, useAppDispatch } from '@redux/configure-store';
import { setEditedDate, setEditedTraining } from '@redux/reducers/appReducer';
import { useSelector } from 'react-redux';
import { TUserTraining } from '../../../../../types';
import { defineBadgeColor } from '@utils/index';
const { Text } = Typography;

type TPopoverTitleComponentProps = {
    listData: TUserTraining[];
    currentDate: Moment;
    handleCloseButton: () => void;
    handleBackButton: () => void;
    popoverStatus: EPopoverStatus;
};

export const PopoverTitleComponent: FC<TPopoverTitleComponentProps> = ({
    listData,
    currentDate,
    handleCloseButton,
    handleBackButton,
    popoverStatus,
}) => {
    const savedFormsData = useSelector((state: RootState) => state.app.savedFormsData);
    const dispatch: AppDispatch = useAppDispatch();
    const dailyTrainingList = listData.map((el) => {
        return { name: el.name, id: el._id };
    });

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
                return dailyTrainingList.map((item) => (
                    <li key={item.id}>
                        <Badge color={defineBadgeColor(item.name)} text={item.name} />
                    </li>
                ));
            case EPopoverStatus.ADD_TRAINING:
                return savedFormsData.length > 0 ? (
                    savedFormsData.map((item) => {
                        return (
                            <Space
                                key={item.id}
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
                                <Button type='link' icon={<EditOutlined />} />
                            </Space>
                        );
                    })
                ) : (
                    <div style={{ height: '81px' }}></div>
                );
            default:
        }
    }, [popoverStatus, dailyTrainingList, savedFormsData]);

    const trainingList = useDefineTrainingList(['Ноги', 'Руки']);

    const handleTrainingsSelect = useCallback(
        (value: string) => {
            dispatch(setEditedTraining(value));
            dispatch(setEditedDate(currentDate));
        },
        [currentDate, dispatch],
    );

    const getTitle = useMemo(() => {
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
        handleBackButton,
        handleCloseButton,
        handleTrainingsSelect,
        popoverStatus,
        trainingList,
    ]);

    return (
        <Space className={styles[cn('title')]} direction='vertical' size={0.5}>
            {getTitle}
            <div className={styles[cn('container')]}>{getContent}</div>
        </Space>
    );
};
