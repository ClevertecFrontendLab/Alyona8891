import { FC } from 'react';

import { Badge, Calendar } from 'antd';
import locale from 'antd/es/date-picker/locale/ru_RU';

import moment from 'moment';
import type { Moment } from 'moment';
import { PopoverComponent } from '../popoverComponent';
import { useGetTrainingQuery } from '@redux/utils/api';
import { TUserTraining } from '../../../../types';
import { defineBadgeColor } from '@utils/index';

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

export const CalendarComponent: FC = () => {
    const { data = [] } = useGetTrainingQuery('');

    const dateCellRender = (value: Moment) => {
        const listData = data?.filter(
            (el) => el.date === moment.utc(value).startOf('day').toISOString(),
        ) as TUserTraining[];

        const dailyTrainingList = listData.map((el) => {
            return { name: el.name, id: el._id };
        });

        return (
            <PopoverComponent listData={listData} currentDate={value}>
                <ul style={{ height: 'calc(100% - 24px)' }}>
                    {dailyTrainingList.length > 0
                        ? dailyTrainingList.map((item) => (
                              <Badge
                                  key={item.id}
                                  color={defineBadgeColor(item.name)}
                                  text={item.name}
                              />
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
