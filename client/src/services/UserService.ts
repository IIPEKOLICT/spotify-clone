import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { HttpMethod } from '../constants/enums';
import { UpdateUserInfoRequestBody } from '../types/dto';
import { UserModel } from '../types/models';
import { fetchBaseQueryFactory } from './base';

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQueryFactory('users'),
  tagTypes: ['user'],
  endpoints: (build) => ({
    updateCurrentUserInfo: build.mutation<UserModel, UpdateUserInfoRequestBody>({
      query: (body: Partial<UpdateUserInfoRequestBody>) => ({
        url: '/current',
        method: HttpMethod.PATCH,
        body: Object.keys(body).reduce(
          (acc: object, key: string) => ({ ...acc, [key]: (body as any)[key] || undefined }),
          {},
        ),
      }),
    }),
  }),
});
