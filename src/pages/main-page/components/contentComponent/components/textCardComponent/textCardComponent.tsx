import { Card } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';

export const TextCardComponent: React.FC<{
  textParts: string[];
  style: React.CSSProperties;
}> = (props) => {
    const { textParts, style } = props;
    return (
        <Card style={{ maxWidth: 752 }} size='small'>
          {textParts.map((part) => <Paragraph style={style}>{part}</Paragraph>)}
        </Card>
    );
};
