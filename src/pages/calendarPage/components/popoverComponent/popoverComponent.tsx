import { FC, useState } from 'react';

import type { Moment } from 'moment';
import { Popover } from 'antd';
import { PopoverTitleComponent } from './popoverTitleComponent';
import { EPopoverStatus, initialFormData } from '@constants/constants';
import { PopoverContentComponent } from './popoverContentComponent';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState, useAppDispatch } from '@redux/configure-store';
import { TUserTraining } from '../../../../types';
import { setEditedTraining, setFormsData, setSavedFormsData } from '@redux/reducers/appReducer';

type TPopoverComponentProps = {
    listData: TUserTraining[];
    currentDate: Moment;
    children: React.ReactNode;
};

export const PopoverComponent: FC<TPopoverComponentProps> = ({
    listData,
    currentDate,
    children,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [popoverStatus, setPopoverStatus] = useState<EPopoverStatus>(
        listData.length > 0 ? EPopoverStatus.WITH_TRAINING : EPopoverStatus.WITHOUT_TRAINING,
    );

    const dispatch: AppDispatch = useAppDispatch();

    const isPanelOpened = useSelector((state: RootState) => state.app.isPanelOpened);

    const handleChangeStatus = (status: EPopoverStatus) => {
        setPopoverStatus(status);
    };

    const handleOpenChange = (newOpen: boolean) => {
        if (isPanelOpened) {
            newOpen = true;
            return;
        }
        setIsOpen(newOpen);
        setPopoverStatus(
            listData.length > 0 ? EPopoverStatus.WITH_TRAINING : EPopoverStatus.WITHOUT_TRAINING,
        );
    };

    const handleCloseButton = () => {
        setPopoverStatus(
            listData.length > 0 ? EPopoverStatus.WITH_TRAINING : EPopoverStatus.WITHOUT_TRAINING,
        );
        setIsOpen(false);
    };

    const handleBackButton = () => {
        setPopoverStatus(
            listData.length > 0 ? EPopoverStatus.WITH_TRAINING : EPopoverStatus.WITHOUT_TRAINING,
        );
        dispatch(setEditedTraining(null));
        dispatch(setFormsData([initialFormData]));
        dispatch(setSavedFormsData([]));
    };

    return (
        <Popover
            zIndex={4}
            showArrow={false}
            open={isOpen}
            onOpenChange={handleOpenChange}
            title={() => (
                <PopoverTitleComponent
                    listData={listData}
                    currentDate={currentDate}
                    handleCloseButton={handleCloseButton}
                    handleBackButton={handleBackButton}
                    popoverStatus={popoverStatus}
                    handleChangeStatus={handleChangeStatus}
                />
            )}
            content={() => (
                <PopoverContentComponent
                    popoverStatus={popoverStatus}
                    handleChangeStatus={handleChangeStatus}
                />
            )}
            align={{ offset: [-7, 172] }}
            trigger='click'
            placement='topLeft'
        >
            {children}
        </Popover>
    );
};
