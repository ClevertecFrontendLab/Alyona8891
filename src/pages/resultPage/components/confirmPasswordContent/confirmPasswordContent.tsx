import VerificationInput from 'react-verification-input';
import { AppDispatch, RootState, useAppDispatch, history } from '@redux/configure-store';
import { Result } from 'antd';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import styles from './confirmPasswordContent.module.scss';
import { useConfirmEmailMutation } from '@redux/utils/api';
import { useEffect, useState } from 'react';
import { setIsLoading } from '@redux/reducers/appReducer';
import { RouterPath } from '@constants/constants';

export const ConfirmPasswordContent = () => {
    const [isConfirmedWithError, setIsConfirmedWithError] = useState(false);
    const [confirmEmail, { isLoading }] = useConfirmEmailMutation();
    const dispatch: AppDispatch = useAppDispatch();
    const email = useSelector((state: RootState) => state.app.userLoginData) as string;

    useEffect(() => {
        if (isLoading) {
            dispatch(setIsLoading(true));
        } else {
            dispatch(setIsLoading(false));
        }
    }, [dispatch, isLoading]);

    const handleCompletingInputs = (code: string) => {
        confirmEmail({ email, code })
            .unwrap()
            .then(() => {
                history.push(RouterPath.SIGN_IN_CHANGE_PASSWORD);
            })
            .catch(() => {
                setIsConfirmedWithError(true);
            });
    };

    return isConfirmedWithError ? (
        <Result
            status='error'
            title='Неверный код. Введите код для восстановления аккауанта'
            subTitle={
                <>
                    <div>
                        Мы отправили вам на e-mail{' '}
                        <span style={{ fontWeight: '700' }}>{email}</span>
                    </div>
                    <div>шестизначный код. Введите его в поле ниже.</div>
                </>
            }
            extra={
                <>
                    <VerificationInput
                    onComplete={(code: string) => {handleCompletingInputs(code)}}
                        classNames={{
                            container: styles[cn('container')],
                            character: styles[cn('character--error')],
                            characterInactive: styles[cn('character--inactive')],
                            characterSelected: styles[cn('character--selected')],
                            characterFilled: styles[cn('character--filled')],
                        }}
                        placeholder=''
                    />
                    <div style={{ fontSize: '0.875rem', color: 'var(--color-info)' }}>
                        Не пришло письмо? Проверьте папку Спам.
                    </div>
                </>
            }
        />
    ) : (
        <Result
            title='Введите код для восстановления аккауанта'
            subTitle={
                <>
                    <div>
                        Мы отправили вам на e-mail{' '}
                        <span style={{ fontWeight: '700' }}>{email}</span>
                    </div>
                    <div>шестизначный код. Введите его в поле ниже.</div>
                </>
            }
            extra={
                <>
                    <VerificationInput
                    onComplete={(code: string) => {handleCompletingInputs(code)}}
                        classNames={{
                            container: styles[cn('container')],
                            character: styles[cn('character')],
                            characterInactive: styles[cn('character--inactive')],
                            characterSelected: styles[cn('character--selected')],
                            characterFilled: styles[cn('character--filled')],
                        }}
                        placeholder=''
                    />
                    <div style={{ fontSize: '0.875rem', color: 'var(--color-info)' }}>
                        Не пришло письмо? Проверьте папку Спам.
                    </div>
                </>
            }
        />
    );
};
