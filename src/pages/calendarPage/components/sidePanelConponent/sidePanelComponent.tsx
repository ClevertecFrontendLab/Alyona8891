import cn from 'classnames';
import styles from './sidePanelComponent.module.scss';

import { useSelector } from 'react-redux';
import { AppDispatch, RootState, useAppDispatch } from '@redux/configure-store';
import { Drawer } from 'antd';
import { setIsPanelOpened } from '@redux/reducers/appReducer';
import { DRAWER } from '@constants/constants';
import { SidePanelContent } from './sidePanelContent';

export const SidePanelComponent = () => {
    const open = useSelector((state: RootState) => state.app.isPanelOpened);
    const dispatch: AppDispatch = useAppDispatch();

    return (
        <Drawer
        zIndex={1000000}
            className={styles[cn('panel')]}
            drawerStyle={{ backgroundColor: 'var(--backgroud-color-element)' }}
            maskStyle={{ backgroundColor: 'initial' }}
            open={open}
            onClose={() => {
                dispatch(setIsPanelOpened(false));
            }}
            onClick={(e) => {e.stopPropagation()}}
            placement='right'
            title={DRAWER.createExercise.title}
        >
            <SidePanelContent />
        </Drawer>
    );
};
