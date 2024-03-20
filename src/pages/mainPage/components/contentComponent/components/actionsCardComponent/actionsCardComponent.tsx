import { Button, Card } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import React, { useCallback } from 'react';
import { AppDispatch, history, useAppDispatch } from '@redux/configure-store';

import cn from 'classnames';
import styles from './actionCardComponent.module.scss';
import { RequestResult, RouterPath, TOKEN_STORAGE_PROPERTY } from '@constants/constants';
import { redirectToLogin } from '@utils/index';
import { setIsErrorModal, setRequestResult } from '@redux/reducers/appReducer';
import { useGetTrainingQuery } from '@redux/utils/api';

export const ActionsCardComponent: React.FC<{
    title: string;
    button: { text: string; icon: React.ReactNode };
    path: RouterPath;
}> = (props) => {
    const { title, button, path } = props;
    const { text, icon } = button;
    const token =
        localStorage.getItem(TOKEN_STORAGE_PROPERTY) ||
        sessionStorage.getItem(TOKEN_STORAGE_PROPERTY);

    const breakpoint = useBreakpoint();
    const { data, error } = useGetTrainingQuery();

    const dispatch: AppDispatch = useAppDispatch();

    const headStyle: React.CSSProperties = {
        padding: '0 24px',
        fontSize: '16px',
        textAlign: breakpoint.xs ? 'center' : 'center',
        wordWrap: 'unset',
    };

    const defineOnClick = useCallback(
        (path: RouterPath) => {
            switch (path) {
                case RouterPath.CALENDAR:
                    if (!token) {
                        redirectToLogin();
                    } else {
                        if (error) {
                            dispatch(setRequestResult(RequestResult.ERROR_403));
                            dispatch(setIsErrorModal(true));
                        } else if (data) {
                            history.push(path);
                        }
                    }
                    break;
                default:
                    break;
            }
        },
        [data, dispatch, error, token],
    );

    return (
        <Card
            title={title}
            headStyle={headStyle}
            size='small'
            className={styles[cn('card')]}
            bodyStyle={{ textAlign: 'center', paddingBottom: '1.1rem', paddingTop: '1.2rem' }}
        >
            <Button
                data-test-id={path === RouterPath.CALENDAR ? 'menu-button-calendar' : undefined}
                icon={icon}
                size='small'
                style={{ color: 'var(--color-primary)' }}
                type='text'
                onClick={() => {
                    defineOnClick(path);
                }}
            >
                {text}
            </Button>
        </Card>
    );
};
