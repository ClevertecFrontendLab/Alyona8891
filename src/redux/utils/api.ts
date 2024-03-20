import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './service';
import { PostFeedback, TUserTraining, UserData } from '../../types';

export const apiService = createApi({
    reducerPath: 'apiService',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['feedbacks', 'training'],
    endpoints: (builder) => ({
        signUpUser: builder.mutation({
            query: (formData: UserData) => ({
                url: '/auth/registration',
                method: 'post',
                data: formData,
            }),
        }),
        signInUser: builder.mutation({
            query: (formData: UserData) => ({
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
        getFeedbacks: builder.query({
            query: () => ({
                url: '/feedback',
                method: 'get',
            }),
            providesTags: ['feedbacks'],
        }),
        postFeedback: builder.mutation({
            query: (data: PostFeedback) => ({
                url: '/feedback',
                method: 'post',
                data,
            }),
            invalidatesTags: ['feedbacks'],
        }),
        getTraining: builder.query<TUserTraining[], void>({
            query: () => ({
                url: '/training',
                method: 'get',
            }),
            providesTags: ['training'],
        }),
        getTrainingList: builder.query({
            query: () => ({
                url: '/catalogs/training-list',
                method: 'get',
            }),
        }),
        addTraining: builder.mutation({
            query: (data: TUserTraining) => ({
                url: '/training',
                method: 'post',
                data,
            }),
            invalidatesTags: ['training'],
        }),
        editTraining: builder.mutation({
            query: (data: TUserTraining) => ({
                url: `/training/${data._id}`,
                method: 'put',
                data,
            }),
            invalidatesTags: ['training'],
        }),
    }),
});

export const {
    useSignUpUserMutation,
    useSignInUserMutation,
    useCheckEmailMutation,
    useConfirmEmailMutation,
    useChangePasswordMutation,
    useGetFeedbacksQuery,
    usePostFeedbackMutation,
    useGetTrainingQuery,
    useGetTrainingListQuery,
    useAddTrainingMutation,
    useEditTrainingMutation,
} = apiService;
