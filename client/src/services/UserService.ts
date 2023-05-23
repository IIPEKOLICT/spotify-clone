import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { REACT_APP_SERVER_URL } from '../constants/environment';
import { HttpMethod } from '../constants/enums';
import { UpdateUserInfoRequestBody } from '../types/dto';
import { UserModel } from '../types/models';

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${REACT_APP_SERVER_URL}/users`,
    credentials: 'include',
  }),
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
