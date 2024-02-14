import {
    CalendarTwoTone,
    HeartFilled,
    IdcardOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    TrophyFilled,
} from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import cn from 'classnames';
import React, { useState } from 'react';

import styles from './siderComponent.module.scss';

const MENU_ITEMS = [
    {
        key: '1',
        icon: CalendarTwoTone,
        isTwoTonesIcon: true,
        label: 'Календарь',
    },
    {
        key: '2',
        icon: HeartFilled,
        isTwoTonesIcon: false,
        label: 'Тренировки',
    },
    {
        key: '3',
        icon: TrophyFilled,
        isTwoTonesIcon: false,
        label: 'Достижения',
    },
    {
        key: '4',
        icon: IdcardOutlined,
        isTwoTonesIcon: false,
        label: 'Профиль',
    },
];

const EXIT_BUTTON = 'Выход';

const { Sider } = Layout;

export const SiderComponent: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    const handleSiderButton = () => {
        setCollapsed(!collapsed);
    };
    return (
        <>
            <Sider
                className={styles[cn('sider')]}
                collapsed={collapsed}
                collapsible
                width='208px'
                style={{ backgroundColor: 'var(--backgroud-color-element)', minHeight: '100vh' }}
                trigger={null}
            >
                <a className={styles[cn('logo')]} href='#' onClick={(e) => e.preventDefault()}>
                    <img
                        alt='logo'
                        src={
                            collapsed
                                ? '/src/assets/images/logo_short.svg'
                                : '/src/assets/images/logo_long.svg'
                        }
                    />
                </a>
                <Menu
                    mode='inline'
                    style={{ color: 'var(--color-title)', fontSize: '1rem' }}
                    items={MENU_ITEMS.map((item) => {
                        return {
                            key: item.key,
                            icon: (
                                <item.icon
                                    style={{ color: 'var(--color-elements)' }}
                                    twoToneColor={
                                        item.isTwoTonesIcon ? 'var(--color-elements)' : undefined
                                    }
                                />
                            ),
                            label: item.label,
                        };
                    })}
                />
                {collapsed ? (
                    <MenuUnfoldOutlined
                        className={styles[cn('sider_button')]}
                        onClick={handleSiderButton}
                    />
                ) : (
                    <MenuFoldOutlined
                        className={styles[cn('sider_button')]}
                        onClick={handleSiderButton}
                    />
                )}
                <Button
                    style={{
                        position: 'absolute',
                        display: 'flex',
                        justifyContent: 'start',
                        alignItems: 'start',
                        width: '100%',
                        color: 'var(--color-title)',
                        backgroundColor: 'inherit',
                        lineHeight: '1rem',
                    }}
                    className={styles[cn('exit_button')]}
                    type='text'
                >
                    <img
                        alt='exit_icon'
                        className={styles[cn('exit_icon')]}
                        src='/src/assets/images/exit_icon.svg'
                    />
                    {!collapsed && EXIT_BUTTON}
                </Button>
            </Sider>
        </>
    );
};
