import { Button } from 'antd';
import { Footer } from 'antd/lib/layout/layout';

const FOOTER_LINKS = [{ id: 1, text: 'Смотреть отзывы' }];

export const FooterComponent: React.FC = () => {
    return (
        <Footer style={{ backgroundColor: 'inherit' }}>
            {FOOTER_LINKS.map((link) => {
                return (
                    <Button
                        key={link.id}
                        size='small'
                        style={{ color: 'var(--color-primary' }}
                        type='text'
                    >
                        {link.text}
                    </Button>
                );
            })}
        </Footer>
    );
};
