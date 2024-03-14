import { HeaderComponent } from '@pages/ui/headerComponent';
import { ContentComponent } from './components/contentComponent';
import { FooterComponent } from './components/footerComponent';
import { MainLayout } from '@layouts/mainLayout';
import { RouterPath } from '@constants/constants';
import { ModalComponent } from '@pages/ui/modalComponent';
import { LoaderComponent as Loader } from '@pages/ui/loader';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/configure-store';
import { useGetTrainingQuery } from '@redux/utils/api';

const routes = [
    {
        key: '1',
        path: RouterPath.MAIN,
        breadcrumbName: 'Главная',
    },
];

const TITLE = [
    'Приветствуем тебя в CleverFit — приложении,',
    'которое поможет тебе добиться своей мечты!',
];

export const MainPage = () => {
    const isErrorModal = useSelector((state: RootState) => state.app.isErrorModal);
    const { isFetching } = useGetTrainingQuery('');

    return (
        <>
            <MainLayout>
                <HeaderComponent routes={routes} title={TITLE} />
                <ContentComponent />
                <FooterComponent />
            </MainLayout>
            {isFetching && <Loader />}
            {isErrorModal && <ModalComponent />}
        </>
    );
};
