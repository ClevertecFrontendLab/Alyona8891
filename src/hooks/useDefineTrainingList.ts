import { RootState } from '@redux/configure-store';
import { useSelector } from 'react-redux';

export const useDefineTrainingList = (arr) => {
    const trainingList = useSelector((state: RootState) => state.app.trainingList);

    if (arr.length < trainingList.length) {
        return trainingList.reduce((acc, training) => {
            if (!arr.find((e) => e === training.name)) {
                acc.push({ value: training.key, label: training.name });
            }
            return acc;
        }, []);
    } else {
        return [];
    }
};
