import cn from 'classnames';
import styles from './feedbackModal.module.scss';

import { AppDispatch, RootState, useAppDispatch } from '@redux/configure-store';
import { Button, Form } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { useSelector } from 'react-redux';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { history } from '@redux/configure-store';
import { setIsFeedbackModal, setIsLoading } from '@redux/reducers/appReducer';
import { FEEDBACK_MODAL } from '@constants/constants';
import { useEffect, useState } from 'react';
import { CustomRate } from '@pages/ui/customRate';
import { Input } from 'antd';
import { usePostFeedbackMutation } from '@redux/utils/api';
const { TextArea } = Input;

export const FeedbackModal = () => {
    const isFeedbackModal = useSelector((state: RootState) => state.app.isFeedbackModal);
    const breakpoint = useBreakpoint();
    const [postFeedback, { isLoading }] = usePostFeedbackMutation();
    const dispatch: AppDispatch = useAppDispatch();
    const [rating, setRating] = useState(0);
    const [form] = Form.useForm();

    useEffect(() => {
        if (isLoading) {
            dispatch(setIsLoading(true));
        } else {
            dispatch(setIsLoading(false));
        }
    }, [dispatch, isLoading]);

    const handlePublish = () => {
        const message = form.getFieldValue('feedback');
        postFeedback({ message, rating })
            .unwrap()
            .then((res) => {
                console.log('success');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleCancel = () => {
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
                    <TextArea style={{ height: 46 }} placeholder={FEEDBACK_MODAL.placeholder} />
                </Form.Item>
            </Form>
        </Modal>
    );
};
