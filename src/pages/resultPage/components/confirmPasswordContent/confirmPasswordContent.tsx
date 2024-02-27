import VerificationInput from 'react-verification-input';
import { AppDispatch, RootState, useAppDispatch, history } from '@redux/configure-store';
import { Result } from 'antd';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import styles from './confirmPasswordContent.module.scss';
import { useConfirmEmailMutation } from '@redux/utils/api';
import { useEffect, useState } from 'react';
import { setIsLoading } from '@redux/reducers/appReducer';
import { CONFIRM_PASSWORD, RouterPath } from '@constants/constants';

export const ConfirmPasswordContent = () => {
    const [isConfirmedWithError, setIsConfirmedWithError] = useState(false);
    const [confirmEmail, { isLoading }] = useConfirmEmailMutation();
    const dispatch: AppDispatch = useAppDispatch();
    const email = useSelector((state: RootState) => state.app.userLoginData) as string;
    const [value, setValue] = useState('');

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
                setValue('');
            });
    };

    return isConfirmedWithError ? (
        <Result
            status='error'
            title={CONFIRM_PASSWORD.error.title}
            subTitle={
                <>
                    <div>
                        {CONFIRM_PASSWORD.error.subtitle.part1}{' '}
                        <span style={{ fontWeight: '700' }}>{email}</span>
                    </div>
                    <div>{CONFIRM_PASSWORD.error.subtitle.part2}</div>
                </>
            }
            extra={
                <>
                    <VerificationInput
                        inputProps={{ 'data-test-id': 'verification-input' }}
                        onComplete={(code: string) => {
                            handleCompletingInputs(code);
                        }}
                        value={value}
                        onChange={(val) => setValue(val)}
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
                        {CONFIRM_PASSWORD.error.subtitle.part3}
                    </div>
                </>
            }
        />
    ) : (
        <Result
            title={CONFIRM_PASSWORD.content.title}
            subTitle={
                <>
                    <div>
                        {CONFIRM_PASSWORD.content.subtitle.part1}{' '}
                        <span style={{ fontWeight: '700' }}>{email}</span>
                    </div>
                    <div>{CONFIRM_PASSWORD.content.subtitle.part2}</div>
                </>
            }
            extra={
                <>
                    <VerificationInput
                        inputProps={{ 'data-test-id': 'verification-input' }}
                        onComplete={(code: string) => {
                            handleCompletingInputs(code);
                        }}
                        value={value}
                        onChange={(val) => setValue(val)}
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
                        {CONFIRM_PASSWORD.content.subtitle.part3}
                    </div>
                </>
            }
        />
    );
};
