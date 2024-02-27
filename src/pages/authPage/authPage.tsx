import { useSelector } from 'react-redux';
import { RootState } from '@redux/configure-store';
import { LoaderComponent as Loader } from '@ui/loader';
import { AuthContentLayout } from '@layouts/authContentLayout';
import { AuthLayout } from '@layouts/authLayout';

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
