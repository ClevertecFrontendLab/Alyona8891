import { Button } from 'antd';
import { history } from '@redux/configure-store';

export const ResultPageButton = (props: { path: string }) => {
    const { path } = props;

    return (
        <Button size='large' type='primary' onClick={() => history.push(path)}>
            Повторить
        </Button>
    );
};
