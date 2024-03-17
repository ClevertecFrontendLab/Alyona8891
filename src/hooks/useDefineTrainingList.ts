import { RootState } from '@redux/configure-store';
import { useSelector } from 'react-redux';

export const useDefineTrainingList = (arr) => {
    const trainingList = useSelector((state: RootState) => state.app.trainingList);

    if (arr.length < trainingList.length) {
        return trainingList.reduce((acc, training) => {
            const { name, key } = training;

            if (!arr.find((e) => e === name)) {
                acc.push({ value: key, label: name });
            }
            return acc;
        }, []);
    } else {
        return [];
    }
};
