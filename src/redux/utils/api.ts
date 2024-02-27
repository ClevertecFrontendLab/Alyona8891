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
        checkEmail: builder.mutation({
            query: (data: { email: string }) => ({
                url: '/auth/check-emailл',
                headers: { authorization: 'authorization' },
                method: 'post',
                data,
            }),
        }),
    }),
});

export const { useSignUpUserMutation, useSignInUserMutation, useCheckEmailMutation } = apiService;
