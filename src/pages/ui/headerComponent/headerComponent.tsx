import { FC, useMemo } from 'react';

import cn from 'classnames';
import styles from './headerComponent.module.scss';

import { Button, Col, PageHeader, Row } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import { BreadcrumpComponent } from '@pages/ui/breadcrumbComponent';
import { THeaderComponentProps } from '../../../types';

const SETTING_BUTTON = 'Настройки';

export const HeaderComponent: FC<THeaderComponentProps> = (props) => {
    const { routes, title } = props;

    const breakpoint = useBreakpoint();

    const titleGroup = useMemo(
        () =>
            title ? title.map((title) => <h1 className={styles[cn('title')]}>{title}</h1>) : null,
        [title],
    );

    return (
        <PageHeader
            breadcrumbRender={() => <BreadcrumpComponent routes={routes} />}
            style={{
                backgroundColor: 'var(--background-color-header)',
                color: 'var(--color-title)',
                padding: '0.9rem 1.8rem 0rem 1.5rem',
            }}
        >
            <Row>
                <Col flex='1 1'>{titleGroup}</Col>
                <Col style={{ textAlign: breakpoint.xs ? 'right' : 'left' }} flex='0 1 70px'>
                    {breakpoint.xs ? (
                        <Button shape='circle' icon={<SettingOutlined />}></Button>
                    ) : (
                        <Button
                            icon={<SettingOutlined />}
                            className={styles[cn('setting_button')]}
                            style={{ marginTop: breakpoint.xs ? '0' : '-5px' }}
                            type='text'
                        >
                            {SETTING_BUTTON}
                        </Button>
                    )}
                </Col>
            </Row>
        </PageHeader>
    );
};
