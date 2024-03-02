import { Breadcrumb, PageHeader } from 'antd';
import cn from 'classnames';
import styles from './headerComponent.module.scss';

import { RouterPath } from '@constants/constants';
import { Link } from 'react-router-dom';

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

export const HeaderComponent: React.FC = () => {
    return (
        <PageHeader
            className={styles[cn('header')]}
            breadcrumbRender={() => (
                <Breadcrumb>
                    {routes.map((route) => (
                        <Breadcrumb.Item className={styles[cn('breadcrumb')]} key={route.key}>
                            <Link to={route.path}>{route.breadcrumbName}</Link>
                        </Breadcrumb.Item>
                    ))}
                </Breadcrumb>
            )}
        />
    );
};
