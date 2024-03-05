import { HeaderComponent } from './components/headerComponent';
import { ContentComponent } from './components/contentComponent';
import { FooterComponent } from './components/footerComponent';
import { MainLayout } from '@layouts/mainLayout';
import { FC } from 'react';

export const MainPage: FC = () => (
    <MainLayout>
        <HeaderComponent />
        <ContentComponent />
        <FooterComponent />
    </MainLayout>
);
