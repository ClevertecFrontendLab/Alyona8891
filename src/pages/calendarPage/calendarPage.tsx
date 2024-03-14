import { FC } from 'react';

import { Calendar } from 'antd';

import { RouterPath } from '@constants/constants';
import { MainLayout } from '@layouts/mainLayout';
import { HeaderComponent } from '@pages/ui/headerComponent';

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
    return (
        <MainLayout>
            <HeaderComponent routes={routes} />
            <Calendar />
        </MainLayout>
    );
};
