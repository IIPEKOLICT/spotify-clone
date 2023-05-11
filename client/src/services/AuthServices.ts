import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const authAPI = createApi({
    reducerPath: "authAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_SERVER_ENDPOINT as string,
        credentials: "include",
    }),
    endpoints: (build) => ({
        signUp: build.mutation<any, any>({
            query: (body) => ({
                url: "/auth/register",
                method: "POST",
                body,
            }),
        }),
        signIn: build.mutation<any, any>({
            query: (body) => ({
                url: "/auth/login",
                method: "POST",
                body,
            }),
        }),
    }),
});