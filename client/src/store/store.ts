import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authAPI } from "../services/AuthServices";

const rootReducer = combineReducers({
    [authAPI.reducerPath]: authAPI.reducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat([
                authAPI.middleware,
            ]),
    });
};