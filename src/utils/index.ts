import { RootState, history } from '@redux/configure-store';
import { RouterPath } from '@constants/constants';

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
