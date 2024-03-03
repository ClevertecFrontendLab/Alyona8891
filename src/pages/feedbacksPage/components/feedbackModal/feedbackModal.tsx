import cn from 'classnames';
import styles from './feedbackModal.module.scss';

import { AppDispatch, RootState, useAppDispatch } from '@redux/configure-store';
import { Button, Form } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { useSelector } from 'react-redux';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import {
    setIsErrorModal,
    setIsFeedbackModal,
    setIsLoading,
    setRequestResult,
    setUserFeedback,
} from '@redux/reducers/appReducer';
import { FEEDBACK_MODAL, RequestResult } from '@constants/constants';
import { useEffect, useState } from 'react';
import { CustomRate } from '@pages/ui/customRate';
import { Input } from 'antd';
import { usePostFeedbackMutation } from '@redux/utils/api';
const { TextArea } = Input;

export const FeedbackModal = () => {
    const isFeedbackModal = useSelector((state: RootState) => state.app.isFeedbackModal);
    const userFeedback = useSelector((state: RootState) => state.app.userFeedback);
    const [message] = useState(userFeedback ? userFeedback.message : '');
    const breakpoint = useBreakpoint();
    const [postFeedback, { isLoading }] = usePostFeedbackMutation();
    const dispatch: AppDispatch = useAppDispatch();
    const [rating, setRating] = useState(userFeedback ? userFeedback.rating : 0);
    const [form] = Form.useForm();

    useEffect(() => {
        if (isLoading) {
            dispatch(setIsLoading(true));
        } else {
            dispatch(setIsLoading(false));
        }
    }, [dispatch, isLoading]);

    const handlePublish = () => {
        dispatch(setUserFeedback({ message, rating }));
        postFeedback({ message, rating })
            .unwrap()
            .then(() => {
                dispatch(setIsFeedbackModal(false));
                dispatch(setRequestResult(RequestResult.SUCCESS));
                dispatch(setIsErrorModal(true));
            })
            .catch(() => {
                dispatch(setIsFeedbackModal({ message, rating }));
                dispatch(setIsFeedbackModal(false));
                dispatch(setRequestResult(RequestResult.ERROR_FEEDBACK));
                dispatch(setIsErrorModal(true));
            });
    };

    const handleCancel = () => {
        const message = form.getFieldValue('feedback');
        dispatch(setUserFeedback({ message, rating }));
        dispatch(setIsFeedbackModal(false));
    };

    return (
        <Modal
            title={FEEDBACK_MODAL.title}
            wrapClassName={styles[cn('wrapper')]}
            centered
            onCancel={handleCancel}
            open={isFeedbackModal}
            width={breakpoint.xs ? 328 : 539}
            footer={[
                <Form.Item key={1}>
                    <Button
                        className={styles[cn('button')]}
                        type='primary'
                        htmlType='submit'
                        size='large'
                        onClick={handlePublish}
                    >
                        {FEEDBACK_MODAL.button}
                    </Button>
                </Form.Item>,
            ]}
            maskStyle={{
                backgroundColor: 'var(--background-auth-page-blure)',
                backdropFilter: 'blur(.3rem)',
            }}
        >
            <CustomRate value={rating} setValue={setRating} />
            <Form form={form} onFinish={handlePublish}>
                <Form.Item name='feedback'>
                    <TextArea
                        value={message}
                        style={{ height: 46 }}
                        placeholder={FEEDBACK_MODAL.placeholder}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};
