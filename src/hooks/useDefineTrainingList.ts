import { RootState } from '@redux/configure-store';
import { TUserTraining } from '../types';
import { useSelector } from 'react-redux';

export const useDefineTrainingList = (arr: TUserTraining[]) => {
    const trainingList = useSelector((state: RootState) => state.app.trainingList);

    if (arr.length < trainingList.length) {
        return trainingList.reduce((acc: { value: string; label: string }[], training) => {
            const { name } = training;
            if (!arr.find((e) => e.name === name)) {
                acc.push({ value: name, label: name });
            }
            return acc;
        }, []);
    } else {
        return [];
    }
};
