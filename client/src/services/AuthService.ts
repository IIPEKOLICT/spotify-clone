import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { CreateUserRequestBody, LoginRequestBody } from '../types/dto';
import { UserModel } from '../types/models';
import { HttpMethod } from '../constants/enums';
import { fetchBaseQueryWithAuthInterceptorFactory } from './base';

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQueryWithAuthInterceptorFactory('auth'),
  tagTypes: ['user'],
  endpoints: (build) => ({
    refreshToken: build.mutation<UserModel, void>({
      query: () => ({
        url: '/refresh',
        method: HttpMethod.GET,
      }),
      transformErrorResponse(baseQueryReturnValue: any) {
        return { type: 'error', message: baseQueryReturnValue.data?.message };
      },
    }),
    signUp: build.mutation<UserModel, CreateUserRequestBody>({
      query: (body: CreateUserRequestBody) => ({
        url: '/register',
        method: HttpMethod.POST,
        body,
      }),
    }),
    signIn: build.mutation<UserModel, LoginRequestBody>({
      query: (body: LoginRequestBody) => ({
        url: '/login',
        method: HttpMethod.POST,
        body,
      }),
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: '/logout',
        method: HttpMethod.POST,
      }),
    }),
    cancelSession: build.mutation<void, void>({
      query: () => ({
        url: '/cancel-session',
        method: HttpMethod.POST,
      }),
    }),
  }),
});
