import { useSelector } from 'react-redux';
import { RootState } from '@redux/configure-store';
import { LoaderComponent as Loader } from '@ui/loader';
import { AuthLayout } from '@layouts/authLayout';
import { ResultContentLayout } from '@layouts/resultContentLayout';

export const ResultPage: React.FC = () => {
    const isLoading = useSelector((state: RootState) => state.app.isLoading);

    return (
        <>
            <AuthLayout>
                <ResultContentLayout />
            </AuthLayout>
            {isLoading && <Loader />}
        </>
    );
};
