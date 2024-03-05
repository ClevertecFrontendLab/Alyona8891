import { history } from '@redux/configure-store';
import { RouterPath } from '@constants/constants';

export const redirectToLogin = () => {
    localStorage.clear();
    sessionStorage.clear();
    history.push(RouterPath.AUTH);
};
