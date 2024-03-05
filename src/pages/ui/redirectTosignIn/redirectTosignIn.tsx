import { RouterPath, TOKEN_STORAGE_PROPERTY } from '@constants/constants';
import { useEffect } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';

export const RedirectToSignIn = () => {
    const isAuthenticated =
        localStorage.getItem(TOKEN_STORAGE_PROPERTY) ||
        sessionStorage.getItem(TOKEN_STORAGE_PROPERTY);

    const [searchParams] = useSearchParams();
    const token = searchParams.get('accessToken');
    const navigate = useNavigate();

    useEffect(()=> {
        if (token) {
            localStorage.setItem(TOKEN_STORAGE_PROPERTY, token);
            navigate(RouterPath.MAIN);
        }
    }, [navigate, token])

    return isAuthenticated ? (
        <Navigate to={RouterPath.MAIN} />
    ) : (
        <Navigate to={RouterPath.SIGN_IN} />
    );
};
