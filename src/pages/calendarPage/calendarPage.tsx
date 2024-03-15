import { FC, useEffect, useMemo, useRef } from 'react';

import { Calendar, Modal } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import locale from 'antd/es/date-picker/locale/ru_RU';
import { Content, Footer } from 'antd/lib/layout/layout';

import moment from 'moment';
import { RouterPath, TOKEN_STORAGE_PROPERTY } from '@constants/constants';
import { MainLayout } from '@layouts/mainLayout';
import { HeaderComponent } from '@pages/ui/headerComponent';
import { useGetTrainingListQuery } from '@redux/utils/api';
import { redirectToLogin } from '@utils/index';
import { LoaderComponent as Loader } from '@pages/ui/loader';
import { AppDispatch, RootState, useAppDispatch } from '@redux/configure-store';
import { setTrainingList } from '@redux/reducers/appReducer';
import { useSelector } from 'react-redux';

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

const ERROR_MODAl = {
    title: 'При открытии данных произошла ошибка',
    content: 'Попробуйте ещё раз.',
    button: 'Обновить',
};

export const CalendarPage: FC = () => {
    const breakpoint = useBreakpoint();
    const { data, error, isFetching } = useGetTrainingListQuery('');
    const dispatch: AppDispatch = useAppDispatch();
    const trainingList = useSelector((state: RootState) => state.app.trainingList);
    const fix = useRef(true);

    const [modal, contextHolder] = Modal.useModal();
    const config = useMemo(() => {
        return {
            title: ERROR_MODAl.title,
            content: ERROR_MODAl.content,
            closable: true,
            centered: true,
            maskClosable: true,
            maskStyle: {
                backgroundColor: 'var(--background-auth-page-blure)',
                backdropFilter: 'blur(.3rem)',
            },
            okText: ERROR_MODAl.button,
            onOk: () => {
                const token =
                    localStorage.getItem(TOKEN_STORAGE_PROPERTY) ||
                    sessionStorage.getItem(TOKEN_STORAGE_PROPERTY);
                if (!token) {
                    redirectToLogin();
                } else {
                    if (data) {
                        dispatch(setTrainingList(data));
                    } else if (error) {
                        modal.error(config);
                    }
                }
            },
        };
    }, [data, dispatch, error, modal]);

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
                    <Calendar locale={calendarLocale} defaultValue={moment()} />
                </Content>
                <Footer
                    style={{
                        backgroundColor: 'inherit',
                    }}
                />
            </MainLayout>
            {isFetching && <Loader />}
            {contextHolder}
        </>
    );
};
