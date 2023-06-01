import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { REACT_APP_SERVER_URL } from '../constants/environment';
import { CreateUserRequestBody, LoginRequestBody } from '../types/dto';
import { UserModel } from '../types/models';
import { HttpMethod } from '../constants/enums';

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${REACT_APP_SERVER_URL}/auth`,
    credentials: 'include',
  }),
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
        url: '/logout',
        method: HttpMethod.POST,
      }),
    }),
  }),
});
