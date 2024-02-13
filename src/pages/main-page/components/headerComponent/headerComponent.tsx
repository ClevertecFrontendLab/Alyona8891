import { Button, Col, PageHeader, Row } from 'antd';
import cn from 'classnames';
import Title from 'antd/lib/typography/Title';

import styles from './headerComponent.module.scss';
import { SettingOutlined } from '@ant-design/icons';

const routes = [
    {
        path: 'index',
        breadcrumbName: 'Главная',
    },
];

const TITLE =
    'Приветствуем тебя в CleverFit — приложении, которое поможет тебе добиться своей мечты!';
const SETTING_BUTTON = 'Настройки';

export const HeaderComponent: React.FC = () => {
    return (
        <PageHeader

            breadcrumb={{ routes }}
            className='site-page-header'
            style={{ backgroundColor: 'var(--background-color-header)', color: 'var(--color-title)', padding: '0.9rem 0 0.4rem 1.5rem' }}
        >
            <Row>
                <Col flex='1 1'>
                    <Title  className={styles[cn('title')]} level={1} style={{
                        fontWeight: 'bold'
                    }}>
                        {TITLE}
                    </Title>
                </Col>
                <Col flex='0 1 70px'>
                    <Button
                        icon={<SettingOutlined />}
                        className={styles[cn('setting_button')]}
                        type='text'
                    >
                        {SETTING_BUTTON}
                    </Button>
                </Col>
            </Row>
        </PageHeader>
    );
};
