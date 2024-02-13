import { Space } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { TextCardComponent } from './components/textCardComponent';
import { ActionsCardComponent } from './components/actionsCardComponent/actionsCardComponent';
import { CalendarTwoTone, HeartFilled, IdcardOutlined } from '@ant-design/icons';

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
            ' — создавать свой профиль, где ты можешь загружать свои фото, видео и отзывы о тренировках;',
            '— выполнять расписанные тренировки для разных частей тела, следуя подробным инструкциям и советам профессиональных тренеров.',
        ],
        style: {
            color: 'var(--color-elements)',
            fontSize: '16px',
            lineHeight: '1.3',
            marginBottom: '0px',
        },
    },
    {
        id: 2,
        textParts: [
            'CleverFit — это не просто приложение, а твой личный помощник в мире фитнеса. Не откладывай на завтра — начни тренироваться уже сегодня!',
        ],
        style: {
            color: 'var(--color-title)',
            fontSize: '20px',
            lineHeight: '1.3',
            marginBottom: '0px',
        },
    },
];

const ACTIONS_CARDS_DATA: {
    id: number;
    title: string;
    button: { text: string; icon: React.ReactNode };
}[] = [
    { id: 1, title: 'Расписать тренировки', button: { text: 'Тренировки', icon: <HeartFilled /> } },
    {
        id: 2,
        title: 'Назначить календарь',
        button: {
            text: 'Календарь',
            icon: <CalendarTwoTone twoToneColor={'var(--color-primary)'} />,
        },
    },
    {
        id: 3,
        title: 'Заполнить профиль',
        button: {
            text: 'Профиль',
            icon: <IdcardOutlined />,
        },
    },
];

export const ContentComponent: React.FC = () => {
    return (
        <Content style={{ backgroundColor: 'inherit' }}>
            <Space direction='vertical' size='middle' style={{ display: 'flex' }}>
                {PARAGRAGHS_DATA.map((p) => (
                    <TextCardComponent key={p.id} style={p.style} textParts={p.textParts} />
                ))}
                <Space size='middle' style={{ display: 'flex' }}>
                    {ACTIONS_CARDS_DATA.map((card) => (
                        <ActionsCardComponent
                            key={card.id}
                            title={card.title}
                            button={card.button}
                        />
                    ))}
                </Space>
            </Space>
        </Content>
    );
};
