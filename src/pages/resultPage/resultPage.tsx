import { useSelector } from 'react-redux';
import { AuthLayout } from '../../layouts/authLayout/';
import { ResultContentLayout } from '../../layouts/resultContentLayout';
import { RootState } from '@redux/configure-store';
import { Loader } from '../../UI/loader';

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
