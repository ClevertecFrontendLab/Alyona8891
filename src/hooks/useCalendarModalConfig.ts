import { EErrorAction, ERROR_MODAl, TOKEN_STORAGE_PROPERTY } from '@constants/constants';
import { AppDispatch, useAppDispatch } from '@redux/configure-store';
import { setTrainingList } from '@redux/reducers/appReducer';
import { useGetTrainingListQuery } from '@redux/utils/api';
import { redirectToLogin } from '@utils/index';
import { ModalFuncProps } from 'antd';
import { ModalStaticFunctions } from 'antd/lib/modal/confirm';
import { useCallback, useMemo } from 'react';

export const useCalendarModalConfig = (
    modal: Omit<ModalStaticFunctions, 'warn'>,
    errorAction: EErrorAction,
) => {
    const dispatch: AppDispatch = useAppDispatch();
    const { data, error } = useGetTrainingListQuery('');

    const getText = useCallback(() => {
        if (errorAction === EErrorAction.OPEN) {
            return ERROR_MODAl.open;
        } else if (errorAction === EErrorAction.SAVE) {
            return ERROR_MODAl.save;
        }
        return ERROR_MODAl.open;
    }, [errorAction]);

    const config = useMemo(() => {
        const text = getText();
        const { title, content, button } = text;
        return {
            title,
            content,
            closable: true,
            centered: true,
            maskClosable: true,
            maskStyle: {
                backgroundColor: 'var(--background-auth-page-blure)',
                backdropFilter: 'blur(.3rem)',
            },
            okText: button,
            onOk: () => {
                const token =
                    localStorage.getItem(TOKEN_STORAGE_PROPERTY) ||
                    sessionStorage.getItem(TOKEN_STORAGE_PROPERTY);
                if (!token) {
                    redirectToLogin();
                } else {
                    if (data) {
                        dispatch(setTrainingList(data));
                    } else if (error) {
                        modal.error(config as ModalFuncProps);
                    }
                }
            },
        };
    }, [data, dispatch, error, getText, modal]);

    return errorAction && config;
};
