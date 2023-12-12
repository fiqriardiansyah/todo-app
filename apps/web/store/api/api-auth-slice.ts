import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from './base-query';
import { BaseResponse, SigninDataType, SignupDataType } from 'models/auth';

export const authEndpoints = {
    signin: '/auth/login',
    signup: '/auth/register',
    logout: '/auth/logout',
    refreshToken: '/refresh',
};

export const apiAuthSlice = createApi({
    reducerPath: 'api/auth',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        signin: builder.mutation<BaseResponse<{ accessToken: string }>, SigninDataType>({
            query: (arg) => ({
                url: authEndpoints.signin,
                method: 'post',
                body: arg,
            }),
        }),
        signup: builder.mutation<BaseResponse<{ accessToken: string }>, SignupDataType>({
            query: (arg) => ({
                url: authEndpoints.signup,
                method: 'post',
                body: arg,
            }),
        }),
        logout: builder.mutation<void, void>({
            query: () => authEndpoints.logout,
        }),
    }),
});

export const { useSigninMutation, useSignupMutation, useLogoutMutation } = apiAuthSlice;
