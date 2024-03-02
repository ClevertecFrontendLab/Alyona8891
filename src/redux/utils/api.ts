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
                method: 'post',
                data: formData,
            }),
        }),
        signInUser: builder.mutation({
            query: (formData: IUserData) => ({
                url: '/auth/login',
                method: 'post',
                data: formData,
            }),
        }),
        checkEmail: builder.mutation({
            query: (data: { email: string }) => ({
                url: '/auth/check-email',
                method: 'post',
                data,
            }),
        }),
        confirmEmail: builder.mutation({
            query: (data: { email: string; code: string }) => ({
                url: '/auth/confirm-email',
                method: 'post',
                data,
            }),
        }),
        changePassword: builder.mutation({
            query: (data: { password: string; confirmPassword: string }) => ({
                url: '/auth/change-password',
                method: 'post',
                data,
            }),
        }),
        getFeedbacks: builder.mutation({
            query: () => ({
                url: '/feedbackhh',
                method: 'get',
            }),
        }),
    }),
});

export const {
    useSignUpUserMutation,
    useSignInUserMutation,
    useCheckEmailMutation,
    useConfirmEmailMutation,
    useChangePasswordMutation,
    useGetFeedbacksMutation,
} = apiService;
