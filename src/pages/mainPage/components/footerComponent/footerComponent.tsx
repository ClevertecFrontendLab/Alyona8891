import { AndroidFilled, AppleFilled } from '@ant-design/icons';
import { Button, Space } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import { FooterCardComponent } from './components';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { useCallback } from 'react';
import { history } from '@redux/configure-store';
import { RouterPath, TOKEN_STORAGE_PROPERTY } from '@constants/constants';
import { redirectToLogin } from '@utils/index';

export type FooterCardsData = {
    key: number;
    title: { text: string; style: React.CSSProperties };
    info: { text: string; style: React.CSSProperties };
    buttons: {
        key: number;
        icon: React.ReactNode;
        text: string;
    }[];
}

const FOOTER_LINKS = [{ id: 1, text: 'Смотреть отзывы' }];

const FOOTER_CARDS_DATA: FooterCardsData[] = [
    {
        key: 1,
        title: {
            text: 'Скачать на телефон',
            style: { color: 'var(--color-primary)', marginBottom: '0', lineHeight: '1.9rem' },
        },
        info: {
            text: 'Доступно в PRO-тарифе',
            style: { color: 'var(--color-info)', letterSpacing: '0', fontSize: '15px' },
        },
        buttons: [
            { key: 100, icon: <AndroidFilled />, text: 'Android OS' },
            { key: 101, icon: <AppleFilled />, text: 'Apple iOS' },
        ],
    },
];

export const FooterComponent: React.FC = () => {
    const breakpoint = useBreakpoint();

    const handleLookFeedbacks = useCallback(() => {
        const token =
            localStorage.getItem(TOKEN_STORAGE_PROPERTY) ||
            sessionStorage.getItem(TOKEN_STORAGE_PROPERTY);
        if (!token) {
            redirectToLogin();
        } else {
            history.push(RouterPath.FEEDBACKS);
        }
    }, []);

    return (
        <Footer
            style={{
                backgroundColor: 'inherit',
                padding: breakpoint.xs ? '0 1rem 0' : '0 1.5rem 3rem',
            }}
        >
            {FOOTER_LINKS.map((link, i) => {
                return (
                    <Space
                        key={link.id}
                        align={breakpoint.xs ? 'center' : 'end'}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexDirection: breakpoint.xs ? 'column-reverse' : 'row',
                        }}
                        direction={breakpoint.md || breakpoint.xs ? 'vertical' : 'horizontal'}
                    >
                        <Button
                            data-test-id='see-reviews'
                            key={i}
                            size='small'
                            style={{
                                color: 'var(--color-primary)',
                                margin: breakpoint.xs ? '25px 10px 55px 10px' : '10px',
                                fontSize: '16px',
                            }}
                            type='text'
                            onClick={handleLookFeedbacks}
                        >
                            {link.text}
                        </Button>
                        {FOOTER_CARDS_DATA.map((card) => {
                            return (
                                <FooterCardComponent
                                    buttons={card.buttons}
                                    info={card.info}
                                    key={card.key}
                                    title={card.title}
                                />
                            );
                        })}
                    </Space>
                );
            })}
        </Footer>
    );
};
