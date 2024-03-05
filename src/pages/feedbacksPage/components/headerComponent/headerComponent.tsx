import { PageHeader } from 'antd';
import cn from 'classnames';
import styles from './headerComponent.module.scss';

import { RouterPath } from '@constants/constants';
import { BreadcrumpComponent } from '@pages/ui/breadcrumbComponent';
import { FC } from 'react';

const routes = [
    {
        key: 1,
        path: RouterPath.MAIN,
        breadcrumbName: 'Главная',
    },
    {
        key: 2,
        path: RouterPath.FEEDBACKS,
        breadcrumbName: 'Отзывы пользователей',
    },
];

export const HeaderComponent: FC = () => (
    <PageHeader
        className={styles[cn('header')]}
        breadcrumbRender={() => <BreadcrumpComponent routes={routes} />}
    />
);
