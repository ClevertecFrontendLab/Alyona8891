import cn from 'classnames';
import styles from './resultComponent.module.scss';

import { AppDispatch, RootState, useAppDispatch } from '@redux/configure-store';
import { setIsErrorModal } from '@redux/reducers/appReducer';
import { useSelector } from 'react-redux';
import { history } from '@redux/configure-store';
import { RESULT_CARDS_DATA, RequestResult, RouterPath } from '@constants/constants';
import { Button, Result } from 'antd';

export const ResultComponent = () => {
    const requestResult = useSelector((state: RootState) => state.app.requestResult);
    const dispatch: AppDispatch = useAppDispatch();

    const handleBackButton = () => {
        dispatch(setIsErrorModal(false));
        history.push(RouterPath.MAIN);
    };

    if (requestResult === RequestResult.ERROR_403) {
        return (
            <Result
                status='500'
                title={RESULT_CARDS_DATA.feedbacks.error403.title}
                subTitle={RESULT_CARDS_DATA.feedbacks.error403.subtitle.part1}
                extra={
                    <Button
                        onClick={handleBackButton}
                        className={styles[cn('button')]}
                        type='primary'
                        size='large'
                    >
                        {RESULT_CARDS_DATA.feedbacks.error403.button}
                    </Button>
                }
            />
        );
    }
    if (requestResult === RequestResult.SUCCESS) {
        return (
            <Result
                status='success'
                title={RESULT_CARDS_DATA.feedbacks.success.title}
                extra={
                    <Button
                        onClick={handleBackButton}
                        className={styles[cn('button')]}
                        type='primary'
                        size='large'
                    >
                        {RESULT_CARDS_DATA.feedbacks.success.button}
                    </Button>
                }
            />
        );
    }
    if (requestResult === RequestResult.ERROR_FEEDBACK) {
        return (
            <Result
                status='error'
                title={RESULT_CARDS_DATA.feedbacks.errors.title}
                subTitle={RESULT_CARDS_DATA.feedbacks.errors.subtitle.part1}
                extra={[
                    <Button type='primary' key='1'>
                        {RESULT_CARDS_DATA.feedbacks.errors.buttons.button1}
                    </Button>,
                    <Button key='2'>{RESULT_CARDS_DATA.feedbacks.errors.buttons.button2}</Button>,
                ]}
            />
        );
    }
};
