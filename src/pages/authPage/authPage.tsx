import React from 'react';
import { AuthLayout } from '../../layouts/authLayout';
import { AuthContentLayout } from '../../layouts/authContentLayout';
import { Loader } from '../../UI/Loader';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/configure-store';

export const AuthPage: React.FC = () => {
    const isLoading = useSelector((state: RootState) => state.app.isLoading);

    return (
        <>
            <AuthLayout>
                <AuthContentLayout />
            </AuthLayout>
            {isLoading && <Loader />}
        </>
    );
};
