import { AxiosError, AxiosRequestConfig } from 'axios';
import axiosInstance from './interceptor';
import { IUserData } from '../../types';

type QueryOptions = {
    url: string;
    method: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
    params?: AxiosRequestConfig['params'];
    headers?: AxiosRequestConfig['headers'];
    body?: IUserData;
};

export const axiosBaseQuery =
    ({ baseUrl } = { baseUrl: '' }) =>
    async ({ url, method, data, params, headers, body }: QueryOptions) => {
        try {
            const result = await axiosInstance({
                url: baseUrl + url,
                method,
                data,
                params,
                headers,
                body,
            } as QueryOptions);
            return Promise.resolve(result);
        } catch (axiosError) {
            const err = axiosError as AxiosError;
            return Promise.reject(err?.response?.status);
        }
    };
