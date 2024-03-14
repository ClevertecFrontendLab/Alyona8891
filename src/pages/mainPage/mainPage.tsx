import { FC } from 'react';

import { HeaderComponent } from '@pages/ui/headerComponent';
import { ContentComponent } from './components/contentComponent';
import { FooterComponent } from './components/footerComponent';
import { MainLayout } from '@layouts/mainLayout';
import { RouterPath } from '@constants/constants';

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

export const MainPage: FC = () => (
    <MainLayout>
        <HeaderComponent routes={routes} title={TITLE}  />
        <ContentComponent />
        <FooterComponent />
    </MainLayout>
);
