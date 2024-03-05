import { RouterPath } from '@constants/constants';
import { Navigate } from 'react-router-dom';

export const RedirectToSignIn = () => {
    const isAuthenticated =
        localStorage.getItem('alyona8891_token') ||
        sessionStorage.getItem('alyona8891_token');

    return isAuthenticated ? (
        <Navigate to={RouterPath.MAIN} />
    ) : (
        <Navigate to={RouterPath.SIGN_IN} />
    );
};
