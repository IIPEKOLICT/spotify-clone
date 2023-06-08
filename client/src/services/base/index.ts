import {
  BaseQueryApi,
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/dist/query/react';
import { REACT_APP_SERVER_URL } from '../../constants/environment';
import { RootState } from '../../store/store';
import { HttpHeader, SessionStorageKey } from '../../constants/enums';
import { authActions } from '../../slices/AuthSlice';

export const fetchBaseQueryFactory = (route: string, responseInterceptor?: (response: Response) => void) => {
  return fetchBaseQuery({
    baseUrl: `${REACT_APP_SERVER_URL}/${route}`,
    credentials: 'include',
    prepareHeaders: (headers: Headers, { getState }) => {
      const {
        auth: { accessToken },
      } = getState() as RootState;

      if (accessToken) {
        headers.set(HttpHeader.AUTHORIZATION, accessToken);
      }
    },
    responseHandler: async (response: Response) => {
      if (responseInterceptor) {
        responseInterceptor(response);
      }

      return response.json();
    },
  });
};

export const fetchBaseQueryWithAuthInterceptorFactory = (
  route: string,
): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
  return async (args: string | FetchArgs, api: BaseQueryApi, extraOptions) => {
    const responseInterceptor = (response: Response) => {
      if (response.headers.has(HttpHeader.AUTHORIZATION)) {
        const header: string = response.headers.get(HttpHeader.AUTHORIZATION);

        api.dispatch(authActions.setAccessToken(header));
        sessionStorage.setItem(SessionStorageKey.ACCESS_TOKEN, header);
      }
    };

    const handler = fetchBaseQueryFactory(route, responseInterceptor);
    return handler(args, api, extraOptions);
  };
};
