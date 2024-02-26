import { Button } from 'antd';
import { history } from '@redux/configure-store';

export const ResultPageButton = (props: { path: string, text: string }) => {
    const { path, text } = props;

    return (
        <Button size='large' type='primary' onClick={() => history.push(path)}>
            {text}
        </Button>
    );
};
