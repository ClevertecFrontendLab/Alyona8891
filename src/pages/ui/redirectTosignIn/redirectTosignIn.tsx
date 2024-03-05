import { RouterPath } from '@constants/constants';
import { useEffect } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';

export const RedirectToSignIn = () => {
    const isAuthenticated =
        localStorage.getItem('alyona8891_token') ||
        sessionStorage.getItem('alyona8891_token');

    const [searchParams] = useSearchParams();
    const token = searchParams.get('accessToken');
    const navigate = useNavigate();

    useEffect(()=> {
        if (token) {
            localStorage.setItem('alyona8891_token', token);
            navigate(RouterPath.MAIN);
        }
    }, [navigate, token])

    return isAuthenticated ? (
        <Navigate to={RouterPath.MAIN} />
    ) : (
        <Navigate to={RouterPath.SIGN_IN} />
    );
};
