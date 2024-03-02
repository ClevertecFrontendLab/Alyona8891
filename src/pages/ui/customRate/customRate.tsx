import { Rate } from 'antd';
import { StarFilled, StarOutlined } from '@ant-design/icons';

export const CustomRate = (props: {
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
}) => {
    const { value, setValue } = props;

    const handleChange = (newValue: number) => {
        setValue(newValue);
    };

    const getIcon = (index: number) => {
        if (index + 1 <= value) {
            return <StarFilled />;
        } else {
            return <StarOutlined />;
        }
    };

    return (
        <Rate
            count={5}
            value={value}
            onChange={handleChange}
            character={({ index }) => getIcon(index as number)}
        />
    );
};
