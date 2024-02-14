import { Button, Col, PageHeader, Row } from 'antd';
import cn from 'classnames';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import styles from './headerComponent.module.scss';
import { SettingOutlined } from '@ant-design/icons';

const routes = [
    {
        path: 'index',
        breadcrumbName: 'Главная',
    },
];

const SETTING_BUTTON = 'Настройки';

export const HeaderComponent: React.FC = () => {
    const breakpoint = useBreakpoint();
    return (
        <PageHeader
            breadcrumb={{ routes }}
            style={{
                backgroundColor: 'var(--background-color-header)',
                color: 'var(--color-title)',
                padding: '0.9rem 1.8rem 1.1rem 1.5rem',
            }}
        >
            <Row>
                <Col flex='1 1'>
                    <h1 className={styles[cn('title')]}>
                        Приветствуем тебя в CleverFit — приложении,
                        <br /> которое поможет тебе добиться своей мечты!
                    </h1>
                </Col>
                <Col style={{ textAlign: breakpoint.xs ? 'right' : 'left' }} flex='0 1 70px'>
                    {breakpoint.xs ? (
                        <Button shape='circle' icon={<SettingOutlined />}></Button>
                    ) : (
                        <Button
                            icon={<SettingOutlined />}
                            className={styles[cn('setting_button')]}
                            style={{ marginTop: breakpoint.xs ? '0' : '-5px',
                         }}
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
