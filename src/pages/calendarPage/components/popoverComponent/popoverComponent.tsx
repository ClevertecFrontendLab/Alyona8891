import { FC, useState } from 'react';

import { Popover } from 'antd';
import { PopoverTitleComponent } from './popoverTitleComponent';
import { EPopoverStatus } from '@constants/constants';
import { PopoverContentComponent } from './popoverContentComponent';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/configure-store';

type TPopoverComponentProps = {
    listData: {
        type: string;
        content: string;
    }[];
    currentDate: string;
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
    };

    return (
        <Popover
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
