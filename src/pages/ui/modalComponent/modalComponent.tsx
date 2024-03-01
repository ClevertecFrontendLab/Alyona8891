import cn from 'classnames';
import styles from './modalComponent.module.scss';

import { RESULT_CARDS_DATA } from '@constants/constants';
import { RootState } from '@redux/configure-store';
import { Button, Result } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { useSelector } from 'react-redux';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

export const ModalComponent = () => {
    const isModal = useSelector((state: RootState) => state.app.isModal);
    const breakpoint = useBreakpoint();

    return (
        <Modal
            wrapClassName={
                styles[cn('wrapper')]
            }
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
                    <Button className={styles[cn('button')]} type='primary' size='large'>
                        {RESULT_CARDS_DATA.feedbacks.errors.button}
                    </Button>
                }
            />
        </Modal>
    );
};
