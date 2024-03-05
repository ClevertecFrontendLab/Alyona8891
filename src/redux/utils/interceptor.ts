import { TOKEN_STORAGE_PROPERTY } from '@constants/constants';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://marathon-api.clevertec.ru',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const localStorageToken = localStorage.getItem(TOKEN_STORAGE_PROPERTY);
        const sessionStorageToken = sessionStorage.getItem(TOKEN_STORAGE_PROPERTY);

        if (localStorageToken) {
            config.headers.Authorization = `Bearer ${localStorageToken}`;
        } else {
            config.headers.Authorization = `Bearer ${sessionStorageToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error),
);

export default axiosInstance;
