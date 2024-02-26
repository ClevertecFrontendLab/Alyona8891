import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './service';
import { IUserData } from '../../types';

export const apiService = createApi({
    reducerPath: 'apiService',
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        signUpUser: builder.mutation({
            query: (formData: IUserData) => ({
                url: '/auth/registration',
                headers: { authorization: 'authorization' },
                method: 'post',
                data: formData,
            }),
        }),
        signInUser: builder.mutation({
            query: (formData: IUserData) => ({
                url: '/auth/login',
                headers: { authorization: 'authorization' },
                method: 'post',
                data: formData,
            }),
        }),
    }),
});

export const { useSignUpUserMutation, useSignInUserMutation } = apiService;
