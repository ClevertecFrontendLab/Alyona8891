import cn from 'classnames';
import styles from './resultComponent.module.scss';

import { AppDispatch, RootState, useAppDispatch } from '@redux/configure-store';
import { setIsErrorModal, setIsFeedbackModal } from '@redux/reducers/appReducer';
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

    const handleCloseButton = () => {
        dispatch(setIsErrorModal(false));
    };

    const handleWriteFeedbackButton = () => {
        dispatch(setIsErrorModal(false));
        dispatch(setIsFeedbackModal(true));
    };

    if (requestResult === RequestResult.ERROR_403) {
        return (
            <Result
                status='500'
                className={styles[cn('result_error403_container')]}
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
                className={styles[cn('result_success_container')]}
                title={RESULT_CARDS_DATA.feedbacks.success.title}
                extra={
                    <Button
                        onClick={handleCloseButton}
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
                className={styles[cn('result_error_container')]}
                title={RESULT_CARDS_DATA.feedbacks.errors.title}
                subTitle={RESULT_CARDS_DATA.feedbacks.errors.subtitle.part1}
                extra={[
                    <Button
                        className={styles[cn('button')]}
                        key='1'
                        size='large'
                        type='primary'
                        onClick={handleWriteFeedbackButton}
                    >
                        {RESULT_CARDS_DATA.feedbacks.errors.buttons.button1}
                    </Button>,
                    <Button
                        className={styles[cn('button')]}
                        key='2'
                        size='large'
                        onClick={handleCloseButton}
                    >
                        {RESULT_CARDS_DATA.feedbacks.errors.buttons.button2}
                    </Button>,
                ]}
            />
        );
    }
};
