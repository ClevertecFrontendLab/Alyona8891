import { FC, useState } from 'react';

import { Button, Popover, Space } from 'antd';
import { PopoverTitleComponent } from './popoverTitleComponent';
import { EPopoverStatus, POPOVER } from '@constants/constants';
import { PopoverContentComponent } from './popoverContentComponent';

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
      listData.length > 0 ? EPopoverStatus.ADD : EPopoverStatus.CREATE,
  );
    

    const handleOpenChange = (newOpen: boolean) => {
        setIsOpen(newOpen);
    };

    const handleCloseButton = () => {
        setIsOpen(false);
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
                    popoverStatus={popoverStatus}
                />
            )}
            content={() => (
                <PopoverContentComponent popoverStatus={popoverStatus} />
            )}
            align={{ offset: [-7, 172] }}
            trigger='click'
            placement='topLeft'
        >
            {children}
        </Popover>
    );
};
