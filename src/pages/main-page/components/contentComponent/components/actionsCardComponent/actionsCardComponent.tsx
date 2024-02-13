import { Button, Card } from 'antd';

export const ActionsCardComponent: React.FC<{
    title: string;
    button: { text: string; icon: React.ReactNode };
}> = (props) => {
    const { title, button } = props;
    const { text, icon } = button;
    return (
        <Card
            title={title}
            size='small'
            bordered={true}
            style={{ width: 240, textAlign: 'center' }}
            bodyStyle={{ padding: '1rem' }}
        >
            <Button icon={icon} size='small' style={{ color: 'var(--color-primary' }} type='text'>
                {text as string}
            </Button>
        </Card>
    );
};
