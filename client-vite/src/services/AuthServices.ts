import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { VITE_SERVER_ENDPOINT } from '../constants/environment';
import { CreateUserRequestBody, LoginRequestBody } from '../types/dto';
import { UserModel } from '../types/models';
import { HttpMethod } from '../constants/enums';

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${VITE_SERVER_ENDPOINT}`,
    credentials: 'include',
  }),
  tagTypes: ['user'],
  endpoints: (build) => ({
    refreshToken: build.mutation<UserModel, void>({
      query: () => ({
        url: '/auth/refresh',
        method: HttpMethod.GET,
      }),
      transformErrorResponse(baseQueryReturnValue: any) {
        return { type: 'error', message: baseQueryReturnValue.data?.message };
      },
    }),
    signUp: build.mutation<UserModel, CreateUserRequestBody>({
      query: (body: CreateUserRequestBody) => ({
        url: '/auth/register',
        method: HttpMethod.POST,
        body,
      }),
    }),
    signIn: build.mutation<UserModel, LoginRequestBody>({
      query: (body: LoginRequestBody) => ({
        url: '/auth/login',
        method: HttpMethod.POST,
        body,
      }),
    }),
    updateUser: build.mutation<any, any>({
      query: (body: any) => ({
        url: '/users/current',
        method: HttpMethod.PATCH,
        body,
      }),
    }),
  }),
});
