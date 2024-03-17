import cn from 'classnames';
import styles from './popoverTitleComponent.module.scss';

import { Badge, BadgeProps, Button, Select, Space, Typography } from 'antd';
import { EPopoverStatus, POPOVER } from '@constants/constants';
import { ArrowLeftOutlined, CloseOutlined } from '@ant-design/icons';
import { FC, useCallback, useMemo } from 'react';
import { useDefineTrainingList } from '@hooks/useDefineTrainingList';
import { AppDispatch, useAppDispatch } from '@redux/configure-store';
import { setEditedDate, setEditedTraining } from '@redux/reducers/appReducer';
const { Text } = Typography;

type TPopoverTitleComponentProps = {
    listData: {
        type: string;
        content: string;
    }[];
    currentDate: string;
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
    const dispatch: AppDispatch = useAppDispatch();

    const getContent = useMemo(() => {
        switch (popoverStatus) {
            case EPopoverStatus.WITHOUT_TRAINING:
                return <img src='src/assets/images/empty_image.svg' />;
            case EPopoverStatus.WITH_TRAINING:
                return listData.map((item) => (
                    <li key={item.content}>
                        <Badge status={item.type as BadgeProps['status']} text={item.content} />
                    </li>
                ));
            default:
        }
    }, [listData, popoverStatus]);

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
                        <Space style={{ height: '91px' }}>
                            <ul></ul>
                        </Space>
                    </>
                );
            default:
                return (
                    <>
                        <Text strong>{`${POPOVER.withoutTrainings.title} ${currentDate}`}</Text>
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
            <Space className={styles[cn('list_container')]}>{getContent}</Space>
        </Space>
    );
};
