import cn from 'classnames';
import styles from './modalComponent.module.scss';

import { RESULT_CARDS_DATA, RouterPath } from '@constants/constants';
import { AppDispatch, RootState, useAppDispatch } from '@redux/configure-store';
import { Button, Result } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { useSelector } from 'react-redux';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { history } from '@redux/configure-store';
import { setIsModal } from '@redux/reducers/appReducer';

export const ModalComponent = (props: { path: RouterPath }) => {
    const { path } = props;
    const isModal = useSelector((state: RootState) => state.app.isModal);
    const breakpoint = useBreakpoint();
    const dispatch: AppDispatch = useAppDispatch();

    const handleBackButton = () => {
        dispatch(setIsModal(false));
        history.push(path);
    };

    return (
        <Modal
            wrapClassName={styles[cn('wrapper')]}
            centered
            open={isModal}
            width={breakpoint.xs ? 328 : 539}
            closable={false}
            footer={[]}
            maskStyle={{
                backgroundColor: 'var(--background-auth-page-blure)',
                backdropFilter: 'blur(.3rem)',
            }}
        >
            <Result
                status='500'
                title={RESULT_CARDS_DATA.feedbacks.errors.title}
                subTitle={RESULT_CARDS_DATA.feedbacks.errors.subtitle.part1}
                extra={
                    <Button
                        onClick={handleBackButton}
                        className={styles[cn('button')]}
                        type='primary'
                        size='large'
                    >
                        {RESULT_CARDS_DATA.feedbacks.errors.button}
                    </Button>
                }
            />
        </Modal>
    );
};
