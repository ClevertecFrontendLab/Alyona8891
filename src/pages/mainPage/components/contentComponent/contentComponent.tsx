import { Space } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { TextCardComponent } from './components/textCardComponent';
import { ActionsCardComponent } from './components/actionsCardComponent/actionsCardComponent';
import { CalendarTwoTone, HeartFilled, IdcardOutlined } from '@ant-design/icons';

import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { RouterPath } from '@constants/constants';

const PARAGRAGHS_DATA: {
    id: number;
    textParts: string[];
    style: React.CSSProperties;
}[] = [
    {
        id: 1,
        textParts: [
            'C CleverFit ты сможешь:',
            '— планировать свои тренировки на календаре, выбирая тип и уровень нагрузки;',
            '— отслеживать свои достижения в разделе статистики, сравнивая свои результаты c нормами и рекордами;',
            '— создавать свой профиль, где ты можешь загружать свои фото, видео и отзывы o тренировках;',
            '— выполнять расписанные тренировки для разных частей тела, следуя подробным инструкциям и советам профессиональных тренеров.',
        ],
        style: {
            color: 'var(--color-elements)',
            fontSize: '16px',
            lineHeight: '1.3',
            letterSpacing: '0.5px',
            marginBottom: '0px',
        },
    },
    {
        id: 2,
        textParts: [
            'CleverFit — это не просто приложение, a твой личный помощник в мире фитнеса. He откладывай на завтра — начни тренироваться уже сегодня!',
        ],
        style: {
            color: 'var(--color-title)',
            fontSize: '20px',
            lineHeight: '1.3',
            letterSpacing: '0.7px',
            marginBottom: '0px',
        },
    },
];

const ACTIONS_CARDS_DATA: {
    id: number,
    title: string,
    button: { text: string; icon: React.ReactNode },
    path: RouterPath,
}[] = [
    {
        id: 1,
        title: 'Расписать тренировки',
        button: { text: 'Тренировки', icon: <HeartFilled /> },
        path: RouterPath.CALENDAR,
    },
    {
        id: 2,
        title: 'Назначить календарь',
        button: {
            text: 'Календарь',
            icon: <CalendarTwoTone twoToneColor={'var(--color-primary)'} />,
        },
        path: RouterPath.CALENDAR,
    },
    {
        id: 3,
        title: 'Заполнить профиль',
        button: {
            text: 'Профиль',
            icon: <IdcardOutlined />,
        },
        path: RouterPath.CALENDAR,
    },
];

export const ContentComponent: React.FC = () => {
    const breakpoint = useBreakpoint();

    return (
        <Content
            style={{
                minHeight: 'initial',
                height: '100%',
                backgroundColor: 'inherit',
                padding: breakpoint.xs ? '1.5rem 1rem 1rem' : '1.5rem 0 0 1.5rem',
                flex: '1 1 auto',
            }}
        >
            <Space
                direction='vertical'
                size='large'
                style={{ display: 'flex', marginBottom: '1rem' }}
            >
                {PARAGRAGHS_DATA.map((p) => (
                    <TextCardComponent key={p.id} style={p.style} textParts={p.textParts} />
                ))}
            </Space>
            <Space
                direction={
                    (breakpoint.sm || breakpoint.xs) && !breakpoint.md ? 'vertical' : 'horizontal'
                }
                size={breakpoint.xs ? 'small' : 'middle'}
                style={{ display: 'flex' }}
            >
                {ACTIONS_CARDS_DATA.map((card) => (
                    <ActionsCardComponent key={card.id} title={card.title} button={card.button} path={card.path} />
                ))}
            </Space>
        </Content>
    );
};
