import React from 'react';
import { AuthLayout } from '../../layouts/authLayout';
import { AuthContentLayout } from '../../layouts/authContentLayout';

export const AuthPage: React.FC = () => {
    return (
        <AuthLayout>
            <AuthContentLayout />
        </AuthLayout>
    );
};
