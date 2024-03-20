import cn from 'classnames';
import styles from './modalComponent.module.scss';

import { RootState } from '@redux/configure-store';
import Modal from 'antd/lib/modal/Modal';
import { useSelector } from 'react-redux';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { ResultComponent } from '@pages/feedbacksPage/components/resultComponent';

export const ModalComponent = () => {
    const isErrorModal = useSelector((state: RootState) => state.app.isErrorModal);
    const breakpoint = useBreakpoint();

    return (
        <Modal
            data-test-id='modal-no-review'
            wrapClassName={styles[cn('wrapper')]}
            centered
            open={isErrorModal}
            width={breakpoint.xs ? 328 : 539}
            closable={false}
            footer={null}
            maskStyle={{
                backgroundColor: 'var(--background-auth-page-blure)',
                backdropFilter: 'blur(.3rem)',
            }}
        >
            <ResultComponent />
        </Modal>
    );
};
