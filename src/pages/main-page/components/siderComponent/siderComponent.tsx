import {
    CalendarTwoTone,
    HeartFilled,
    IdcardOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    TrophyFilled,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
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

const { Sider } = Layout;

export const SiderComponent: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    const handleSiderButton = () => {
        setCollapsed(!collapsed);
    };
    return (
        <Sider
            className={styles[cn('sider')]}
            collapsed={collapsed}
            collapsible
            style={{ backgroundColor: 'var(--backgroud-color-element)' }}
            trigger={null}
        >
            <a href='#' onClick={(e) => e.preventDefault()}>
                <img
                    alt='logo'
                    src={
                        collapsed
                            ? '/src/assets/images/logo_short.svg'
                            : '/src/assets/images/logo_long.svg'
                    }
                />
            </a>
            <Menu style={{color: 'var(--color-title)'}}
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
        </Sider>
    );
};
