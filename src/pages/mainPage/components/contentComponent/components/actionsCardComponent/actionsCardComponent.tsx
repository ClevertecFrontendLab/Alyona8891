import { Button, Card } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import React from 'react';

import cn from 'classnames';
import styles from './actionCardComponent.module.scss';

export const ActionsCardComponent: React.FC<{
    title: string;
    button: { text: string; icon: React.ReactNode };
}> = (props) => {
    const { title, button } = props;
    const { text, icon } = button;

    const breakpoint = useBreakpoint();

    const headStyle: React.CSSProperties = {
        padding: "0 24px",
        fontSize: '16px',
        textAlign: breakpoint.xs ? 'center' : 'center',
        wordWrap: 'unset'
    }

    return (
        <Card
            title={title}
            headStyle={headStyle}
            size='small'
            className={styles[cn('card')]}
            bodyStyle={{textAlign: 'center', paddingBottom: '1.1rem', paddingTop: '1.2rem'}}
        >
            <Button icon={icon} size='small' style={{ color: 'var(--color-primary)' }} type='text'>
                {text}
            </Button>
        </Card>
    );
};
