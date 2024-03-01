import { Card } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import cn from 'classnames';
import styles from './textCardContent.module.scss';

export const TextCardComponent: React.FC<{
    textParts: string[];
    style: React.CSSProperties;
}> = (props) => {
    const { textParts, style } = props;
    const breakpoint = useBreakpoint();

    return (
        <Card
            className={styles[cn('card')]}
            headStyle={{ textAlign: breakpoint.xs ? 'center' : 'start' }}
            style={{ paddingRight: breakpoint.xs ? '1rem' : '2.5rem' }}
        >
            {textParts.map((part, i) => (
                <Paragraph key={i} style={style}>
                    {part}
                </Paragraph>
            ))}
        </Card>
    );
};
