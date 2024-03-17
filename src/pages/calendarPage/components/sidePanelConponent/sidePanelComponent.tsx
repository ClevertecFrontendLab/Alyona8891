import cn from 'classnames';
import styles from './sidePanelComponent.module.scss';

import { useSelector } from 'react-redux';
import { AppDispatch, RootState, useAppDispatch } from '@redux/configure-store';
import { Badge, Drawer, Space, Typography } from 'antd';
import { setIsPanelOpened } from '@redux/reducers/appReducer';
import { DRAWER } from '@constants/constants';
import { SidePanelContent } from './sidePanelContent';
import { defineBadgeColor } from '@utils/index';
const { Text } = Typography;

export const SidePanelComponent = () => {
    const open = useSelector((state: RootState) => state.app.isPanelOpened);
    const training = useSelector((state: RootState) => state.app.editedTraining);
    const dispatch: AppDispatch = useAppDispatch();

    return (
        <Drawer
            destroyOnClose
            zIndex={10000}
            className={styles[cn('panel')]}
            drawerStyle={{ backgroundColor: 'var(--backgroud-color-element)' }}
            maskStyle={{ backgroundColor: 'initial' }}
            open={open}
            onClose={() => {
                dispatch(setIsPanelOpened(false));
            }}
            extra={
                <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Badge style={{ color: 'var(--color-info)' }} color={defineBadgeColor(training)} text={training} />
                    <Text style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-info)' }}>
                        08.01.2024
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
