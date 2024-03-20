import cn from 'classnames';
import styles from './sidePanelComponent.module.scss';

import { useSelector } from 'react-redux';
import { AppDispatch, RootState, useAppDispatch } from '@redux/configure-store';
import { Badge, Drawer, Space, Typography } from 'antd';
import { setFormsData, setIsPanelOpened, setSavedFormsData } from '@redux/reducers/appReducer';
import { DRAWER, EPanelStatus, initialFormData } from '@constants/constants';
import { SidePanelContent } from './sidePanelContent';
import { defineBadgeColor } from '@utils/index';
import { useMemo } from 'react';
import { CloseOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

export const SidePanelComponent = () => {
    const open = useSelector((state: RootState) => state.app.isPanelOpened);
    const training = useSelector((state: RootState) => state.app.editedTraining);
    const currentDate = useSelector((state: RootState) => state.app.editedDate);
    const formsData = useSelector((state: RootState) => state.app.formsData);
    const panelStatus = useSelector((state: RootState) => state.app.panelStatus);

    const dispatch: AppDispatch = useAppDispatch();

    const handleClosePanel = () => {
        const savedFormsData = formsData
            .filter((formData) => {
                return formData.name;
            })
            .map((formData) => {
                const { name, quantity, time, weight } = formData;
                const result = {
                    name,
                    quantity: quantity ? quantity : 1,
                    time: time ? time : 1,
                    weight: weight ? weight : 0,
                };
                return result;
            });
        dispatch(setSavedFormsData(savedFormsData));
        dispatch(setFormsData(savedFormsData.length > 0 ? savedFormsData : [initialFormData]));
        dispatch(setIsPanelOpened(false));
    };

    const titleContent = useMemo(() => {
        switch (panelStatus) {
            case EPanelStatus.CREATE:
                return (
                    <>
                        <PlusOutlined />
                        <Title level={4}>{DRAWER.title.create}</Title>
                    </>
                );
            case EPanelStatus.EDIT:
                return (
                    <>
                        <EditOutlined height={'12.5px'} width={'12.5px'} />
                        <Title level={4}>{DRAWER.title.edit}</Title>
                    </>
                );
        }
    }, [panelStatus]);

    const title = useMemo(() => {
        return (
            <Space
                align='center'
                direction='horizontal'
                size={10}
                style={{ display: 'flex', alignItems: 'center' }}
            >
                {titleContent}
            </Space>
        );
    }, [titleContent]);

    return (
        <Drawer
            data-test-id='modal-drawer-right'
            destroyOnClose
            closeIcon={<CloseOutlined data-test-id='modal-drawer-right-button-close' />}
            zIndex={10000}
            className={styles[cn('panel')]}
            drawerStyle={{ backgroundColor: 'var(--backgroud-color-element)' }}
            maskStyle={{ backgroundColor: 'initial' }}
            open={open}
            onClose={handleClosePanel}
            extra={
                <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Badge
                        style={{ color: 'var(--color-info)' }}
                        color={defineBadgeColor(training?.name as string)}
                        text={training?.name}
                    />
                    <Text style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-info)' }}>
                        {currentDate?.formated}
                    </Text>
                </Space>
            }
            placement='right'
            title={title}
        >
            <SidePanelContent />
        </Drawer>
    );
};
