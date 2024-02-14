import { Card } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

export const TextCardComponent: React.FC<{
    textParts: string[];
    style: React.CSSProperties;
}> = (props) => {
    const { textParts, style } = props;
    const breakpoint = useBreakpoint();

    const getCardStyle = ()  => {
        if(breakpoint.xs) return {maxWidth: '100%', paddingRight: '3rem'}
        if(breakpoint.sm) return {maxWidth: '100%', paddingRight: '3rem'}
        if(breakpoint.lg) return {maxWidth: 752, }
    }

    return (
        <Card
            headStyle={{ textAlign: breakpoint.xs ? 'center' : 'start' }}
            style={getCardStyle()}
        >
            {textParts.map((part, i) => (
                <Paragraph key={i} style={style}>
                    {part}
                </Paragraph>
            ))}
        </Card>
    );
};
