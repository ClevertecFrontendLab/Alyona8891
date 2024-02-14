import { Button, Card } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import React from 'react';

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
        textAlign: breakpoint.xs ? 'center' : 'start',
        wordWrap: 'unset'
    }

    const getCardStyle = ()  => {
        if(breakpoint.xs) return {width: '100%', textAlign: 'center'}
        if(breakpoint.sm) return {width: '182px', textAlign: 'center'}
        if(breakpoint.lg) return {width: '240px', textAlign: 'center'}
    }
    return (
        <Card
            title={title}
            headStyle={headStyle}
            size='small'
            style={getCardStyle() as React.CSSProperties}
            bodyStyle={{textAlign: 'center'}}
        >
            <Button icon={icon} size='small' style={{ color: 'var(--color-primary)' }} type='text'>
                {text as string}
            </Button>
        </Card>
    );
};
