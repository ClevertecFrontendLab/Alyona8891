import { Button } from 'antd';
import { history } from '@redux/configure-store';

export const ResultPageButton = (props: { path: string, text: string, data: string }) => {
    const {data, path, text } = props;

    return (
        <Button data-test-id={data}  size='large' type='primary' onClick={() => history.push(path)}>
            {text}
        </Button>
    );
};
