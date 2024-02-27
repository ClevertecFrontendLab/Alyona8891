import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://marathon-api.clevertec.ru',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

axiosInstance.interceptors.request.use(
    (config) => {
        const localStorageToken = localStorage.getItem('alyona8891_token');
        const sessionStorageToken = sessionStorage.getItem('alyona8891_token');

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