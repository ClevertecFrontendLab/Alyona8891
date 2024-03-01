import { HeaderComponent } from './components/headerComponent';
import { ContentComponent } from './components/contentComponent';
import { FooterComponent } from './components/footerComponent';
import { MainLayout } from '@layouts/mainLayout';

export const MainPage: React.FC = () => {
    return (
        <MainLayout>
            <HeaderComponent />
            <ContentComponent />
            <FooterComponent />
        </MainLayout>
    );
};
