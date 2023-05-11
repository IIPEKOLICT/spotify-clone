import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { REACT_APP_SERVER_ENDPOINT } from '../constants/environment';
import { CreateUserRequestBody, LoginRequestBody } from '../types/dto';
import { UserModel } from '../types/models';
import { HttpMethod } from '../constants/enums';

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${REACT_APP_SERVER_ENDPOINT}/auth`,
    credentials: 'include',
  }),
  endpoints: (build) => ({
    refreshToken: build.mutation<any, void>({
      query: () => ({
        url: '/refresh',
        method: HttpMethod.GET,
      }),
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
  }),
});
