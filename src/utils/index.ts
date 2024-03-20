import { RootState, history } from '@redux/configure-store';
import { ETrainings, RouterPath } from '@constants/constants';
import { TSidePanelFormsData } from '../types';

export const redirectToLogin = () => {
    localStorage.clear();
    sessionStorage.clear();
    history.push(RouterPath.AUTH);
};

export const addLeadingZero = (number: number) => {
    return number < 10 ? '0' + number : number;
};

export const getDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = addLeadingZero(date.getMonth() + 1);
    const day = addLeadingZero(date.getDate());

    return `${day}.${month}.${year}`;
};

export const generateUniqueKey = () => {
    const timestamp = new Date().getTime();
    const random = Math.random().toString(36).substring(7);
    return `${timestamp}-${random}`;
};

export const routerSelector = (state: RootState) => state.router;

export const defineBadgeColor = (training: string) => {
    switch (training) {
        case ETrainings.BACK:
            return 'var(--orange)';
        case ETrainings.BREAST:
            return 'var(--green)';
        case ETrainings.POWER:
            return 'var(--yellow)';
        case ETrainings.LEGS:
            return 'var(--red)';
        case ETrainings.ARMS:
            return 'var(--cyan)';
        default:
            return 'var(--magenta)';
    }
};

export const removeElementsFromArray = (
    mainArray: TSidePanelFormsData[],
    elementsToRemove: string[],
) => {
    return mainArray.filter((element) => !elementsToRemove.includes(element._id));
};
