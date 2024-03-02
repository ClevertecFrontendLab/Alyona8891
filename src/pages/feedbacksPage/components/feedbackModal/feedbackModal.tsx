import cn from 'classnames';
import styles from './feedbackModal.module.scss';

import { AppDispatch, RootState, useAppDispatch } from '@redux/configure-store';
import { Button, Rate } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { useSelector } from 'react-redux';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { history } from '@redux/configure-store';
import { setIsFeedbackModal } from '@redux/reducers/appReducer';
import { FEEDBACK_MODAL } from '@constants/constants';
import { useState } from 'react';
import { CustomRate } from '@pages/ui/customRate';
import { Input } from 'antd';
const { TextArea } = Input;

export const FeedbackModal = () => {
    const isFeedbackModal = useSelector((state: RootState) => state.app.isFeedbackModal);
    const breakpoint = useBreakpoint();
    const dispatch: AppDispatch = useAppDispatch();
    const [value, setValue] = useState(0);

    const handlePublish = () => {
        console.log(1);
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
                <Button
                    key={1}
                    onClick={handlePublish}
                    className={styles[cn('button')]}
                    type='primary'
                    size='large'
                >
                    {FEEDBACK_MODAL.button}
                </Button>,
            ]}
            maskStyle={{
                backgroundColor: 'var(--background-auth-page-blure)',
                backdropFilter: 'blur(.3rem)',
            }}
        >
            <CustomRate value={value} setValue={setValue} />
            <TextArea style={{ height: 46 }} placeholder={FEEDBACK_MODAL.placeholder} />
        </Modal>
    );
};
