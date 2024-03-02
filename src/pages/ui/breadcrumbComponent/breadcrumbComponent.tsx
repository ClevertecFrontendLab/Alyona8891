import { Breadcrumb } from 'antd';
import cn from 'classnames';
import styles from './breadcrumbComponent.module.scss';
import { IBreadcrumbItemData } from '../../../types';
import { Link } from 'react-router-dom';

export const BreadcrumpComponent = (props: { routes: IBreadcrumbItemData[] }) => {
    const { routes } = props;
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
