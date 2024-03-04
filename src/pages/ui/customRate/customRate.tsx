import { Rate } from 'antd';
import { StarFilled, StarOutlined } from '@ant-design/icons';

export const CustomRate = (props: {
    value: number;
    setValue?: React.Dispatch<React.SetStateAction<number>>;
    size: number;
}) => {
    const { value, size, setValue } = props;

    const handleChange = (newValue: number) => {
        if (setValue) {
            setValue(newValue);
        }
    };

    const getIcon = (index: number) => {
        if (index + 1 <= value) {
            return <StarFilled style={{ fontSize: size }} />;
        } else {
            return <StarOutlined style={{ fontSize: size }} />;
        }
    };

    return (
        <Rate
            count={5}
            value={value}
            disabled={!handleChange}
            onChange={handleChange}
            character={({ index }) => getIcon(index as number)}
        />
    );
};
