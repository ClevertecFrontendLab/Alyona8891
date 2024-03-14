import { FC } from 'react';

import { Calendar } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import { RouterPath } from '@constants/constants';
import { MainLayout } from '@layouts/mainLayout';
import { HeaderComponent } from '@pages/ui/headerComponent';
import { Content, Footer } from 'antd/lib/layout/layout';

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

    return (
        <MainLayout>
            <HeaderComponent routes={routes} />
            <Content  style={{
                minHeight: 'initial',
                height: '100%',
                backgroundColor: 'var(--background-color-header)',
                padding: breakpoint.xs ? '1.5rem 1rem 1rem' : '1.5rem 0 0 1.5rem',
                flex: '1 1 auto',
            }}>
                <Calendar />
            </Content>
            <Footer  style={{
                backgroundColor: 'inherit',
            }}/>
        </MainLayout>
    );
};
