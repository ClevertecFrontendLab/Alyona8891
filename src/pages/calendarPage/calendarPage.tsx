import { FC } from 'react';

import { Calendar } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import locale from 'antd/es/date-picker/locale/ru_RU';
import { Content, Footer } from 'antd/lib/layout/layout';

import moment from 'moment';
moment.updateLocale('ru', {
    week: {
        dow: 1,
        doy: 0,
    },
});

import { RouterPath } from '@constants/constants';
import { MainLayout } from '@layouts/mainLayout';
import { HeaderComponent } from '@pages/ui/headerComponent';

const calendarLocale = {
    lang: {
        ...locale.lang,
        shortWeekDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        shortMonths: [
            'Янв',
            'Фев',
            'Мар',
            'Апр',
            'Май',
            'Июн',
            'Июл',
            'Авг',
            'Сен',
            'Окт',
            'Ноя',
            'Дек',
        ],
    },
    timePickerLocale: {
        ...locale.timePickerLocale,
    },
};

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
            <Content
                style={{
                    minHeight: 'initial',
                    height: '100%',
                    backgroundColor: 'var(--background-color-header)',
                    padding: breakpoint.xs ? '1.5rem 1rem 1rem' : '1.5rem 0 0 1.5rem',
                    flex: '1 1 auto',
                }}
            >
                <Calendar locale={calendarLocale} defaultValue={moment()} />
            </Content>
            <Footer
                style={{
                    backgroundColor: 'inherit',
                }}
            />
        </MainLayout>
    );
};
