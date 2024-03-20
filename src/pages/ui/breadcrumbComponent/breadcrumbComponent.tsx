import { Breadcrumb } from 'antd';
import cn from 'classnames';
import styles from './breadcrumbComponent.module.scss';
import { TBreadcrumbItemData } from '../../../types';
import { Link } from 'react-router-dom';
import { FC } from 'react';

export const BreadcrumpComponent: FC<{ routes: TBreadcrumbItemData[] }> = ({ routes }) => {
    return (
        <Breadcrumb>
            {routes.map((route) => (
                <Breadcrumb.Item className={styles[cn('breadcrumb')]} key={route.key}>
                    <Link to={route.path}>{route.breadcrumbName}</Link>
                </Breadcrumb.Item>
            ))}
        </Breadcrumb>
    );
};
