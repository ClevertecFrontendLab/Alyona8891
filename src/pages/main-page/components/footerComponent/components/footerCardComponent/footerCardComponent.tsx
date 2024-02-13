import { Button, Card, Space } from 'antd';
import { IFooterCardsData } from '../../footerComponent';
import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';


export const FooterCardComponent: React.FC<IFooterCardsData> = (props) => {
    const { buttons, info, title } = props;
    return (<Card title={<Space
              direction='vertical'
              size='small'
              style={{ display: 'flex', textAlign: 'center' }}
          >
              <Title style={title.style} level={5}>{title.text}</Title>
              <Text style={info.style}>{info.text}</Text>
          </Space>
      }
      style={{ width: 300 }}
  >
      {buttons.map((button) => {return (
        <Button
        icon={button.icon}
        type='text'
    >
        {button.text}
    </Button>
      )})}
  </Card>
  );
};
