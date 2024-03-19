import { FC } from 'react';

import cn from 'classnames';
import styles from './calendarComponent.module.scss';

import { Badge, Calendar } from 'antd';
import locale from 'antd/es/date-picker/locale/ru_RU';

import moment from 'moment';
import type { Moment } from 'moment';
import { PopoverComponent } from '../popoverComponent';
import { useGetTrainingQuery } from '@redux/utils/api';
import { TUserTraining } from '../../../../types';
import { defineBadgeColor } from '@utils/index';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/configure-store';

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
    const trainingList = useSelector((state: RootState) => state.app.trainingList);

    const breakpoint = useBreakpoint();

    const dateCellRender = (value: Moment) => {
        const listData = data?.filter(
            (el) => el.date === moment.utc(value).startOf('day').toISOString(),
        ) as TUserTraining[];

        const dailyTrainingList = listData.map((el) => {
            return { name: el.name, id: el._id };
        });

        return (
            <PopoverComponent listData={listData} currentDate={value}>
                <ul
                    onClick={breakpoint.xs ? undefined : (e) => e.stopPropagation()}
                    className={styles[cn('list')]}
                >
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

    return (
        <Calendar
            fullscreen={breakpoint.xs ? false : true}
            locale={calendarLocale}
            defaultValue={moment()}
            dateCellRender={trainingList.length > 0 ? dateCellRender : undefined}
        />
    );
};
