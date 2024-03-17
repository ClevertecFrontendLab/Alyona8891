import { FC } from 'react';

import { Badge, BadgeProps, Calendar } from 'antd';
import locale from 'antd/es/date-picker/locale/ru_RU';

import moment from 'moment';
import type { Moment } from 'moment';
import { AppDispatch, useAppDispatch } from '@redux/configure-store';
import { PopoverComponent } from '../popoverComponent';
import { setIsPanelOpened } from '@redux/reducers/appReducer';

moment.updateLocale('ru', {
    week: {
        dow: 1,
        doy: 0,
    },
});

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

const getListData = (value: Moment) => {
    let listData;
    switch (value.date()) {
        case 8:
            listData = [
                { type: 'warning', content: 'This is warning event.' },
                { type: 'success', content: 'This is usual event.' },
            ];
            break;
        case 10:
            listData = [
                { type: 'warning', content: 'This is warning event.' },
                { type: 'success', content: 'This is usual event.' },
                { type: 'error', content: 'This is error event.' },
            ];
            break;
        case 15:
            listData = [
                { type: 'warning', content: 'This is warning event' },
                { type: 'success', content: 'This is very long usual event。。....' },
                { type: 'error', content: 'This is error event 1.' },
                { type: 'error', content: 'This is error event 2.' },
                { type: 'error', content: 'This is error event 3.' },
                { type: 'error', content: 'This is error event 4.' },
            ];
            break;
        default:
    }
    return listData || [];
};

export const CalendarComponent: FC = () => {
    const dateCellRender = (value: Moment) => {
        const currentDate = value.format('DD.MM.YYYY');
        const listData = getListData(value);

        return (
            <PopoverComponent listData={listData} currentDate={currentDate}>
                <ul style={{ height: 'calc(100% - 24px)' }}>
                    {listData.length > 0
                        ? listData.map((item) => (
                              <li key={item.content}>
                                  <Badge
                                      status={item.type as BadgeProps['status']}
                                      text={item.content}
                                  />
                              </li>
                          ))
                        : null}
                </ul>
            </PopoverComponent>
        );
    };

    const onSelect = (date: Moment) => {
        console.log(date.toISOString());
    };

    return (
        <Calendar
            locale={calendarLocale}
            defaultValue={moment()}
            dateCellRender={dateCellRender}
            onSelect={onSelect}
        />
    );
};
