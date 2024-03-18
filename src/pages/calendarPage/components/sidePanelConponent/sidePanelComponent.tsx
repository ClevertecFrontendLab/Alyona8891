import cn from 'classnames';
import styles from './sidePanelComponent.module.scss';

import { useSelector } from 'react-redux';
import { AppDispatch, RootState, useAppDispatch } from '@redux/configure-store';
import { Badge, Drawer, Space, Typography } from 'antd';
import { setIsPanelOpened, setSavedFormsData } from '@redux/reducers/appReducer';
import { DRAWER } from '@constants/constants';
import { SidePanelContent } from './sidePanelContent';
import { defineBadgeColor } from '@utils/index';
const { Text } = Typography;

export const SidePanelComponent = () => {
    const open = useSelector((state: RootState) => state.app.isPanelOpened);
    const training = useSelector((state: RootState) => state.app.editedTraining);
    const currentDate = useSelector((state: RootState) => state.app.editedDate);
    const formsData = useSelector((state: RootState) => state.app.formsData);
    const dispatch: AppDispatch = useAppDispatch();

    const handleClosePanel = () => {
        dispatch(setSavedFormsData(formsData));
        dispatch(setIsPanelOpened(false));
    };

    return (
        <Drawer
            destroyOnClose
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
                        color={defineBadgeColor(training)}
                        text={training}
                    />
                    <Text style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-info)' }}>
                        {currentDate}
                    </Text>
                </Space>
            }
            placement='right'
            title={DRAWER.createExercise.title}
        >
            <SidePanelContent />
        </Drawer>
    );
};
