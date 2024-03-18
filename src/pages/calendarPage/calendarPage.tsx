import { FC, useEffect, useRef } from 'react';

import { Modal } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import { Content, Footer } from 'antd/lib/layout/layout';
import { EErrorAction, RouterPath, TOKEN_STORAGE_PROPERTY } from '@constants/constants';
import { MainLayout } from '@layouts/mainLayout';
import { HeaderComponent } from '@pages/ui/headerComponent';
import { useGetTrainingListQuery } from '@redux/utils/api';
import { redirectToLogin } from '@utils/index';
import { LoaderComponent as Loader } from '@pages/ui/loader';
import { AppDispatch, useAppDispatch } from '@redux/configure-store';
import { setTrainingList } from '@redux/reducers/appReducer';
import { CalendarComponent } from './components/calendarComponent';
import { SidePanelComponent } from '@pages/calendarPage/components/sidePanelConponent';
import { useCalendarModalConfig } from '@hooks/useCalendarModalConfig';

const routes = [
    {
        key: '1',
        path: RouterPath.MAIN,
        breadcrumbName: 'Главная',
    },
    {
        key: '2',
        path: RouterPath.CALENDAR,
        breadcrumbName: 'Календарь',
    },
];

export const CalendarPage: FC = () => {
    const breakpoint = useBreakpoint();
    const { data, error, isFetching } = useGetTrainingListQuery('');
    const dispatch: AppDispatch = useAppDispatch();
    const fix = useRef(true);

    const [modal, contextHolder] = Modal.useModal();
    const config = useCalendarModalConfig(modal, EErrorAction.OPEN);

    useEffect(() => {
        const token =
            localStorage.getItem(TOKEN_STORAGE_PROPERTY) ||
            sessionStorage.getItem(TOKEN_STORAGE_PROPERTY);
        if (!token) {
            redirectToLogin();
        } else {
            if (data) {
                dispatch(setTrainingList(data));
            } else if (error) {
                if (fix.current) {
                    modal.error(config);
                }
                fix.current = false;
            }
        }
    }, [config, data, dispatch, error, modal]);

    return (
        <>
            <MainLayout>
                <HeaderComponent routes={routes} />
                <Content
                    style={{
                        minHeight: 'initial',
                        height: '100%',
                        backgroundColor: 'var(--background-color-header)',
                        padding: breakpoint.xs ? '1.5rem 1rem 1rem' : '1.5rem 0 0 1.5rem',
                        flex: '1 1 auto',
                    }}
                >
                    <CalendarComponent />
                </Content>
                <Footer
                    style={{
                        backgroundColor: 'inherit',
                    }}
                />
            </MainLayout>
            <SidePanelComponent />
            {isFetching && <Loader />}
            {contextHolder}
        </>
    );
};
