import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authAPI } from "../services/AuthServices";
import { userReducer } from "../slices/AuthSlice";
import { notificationReducer } from "../slices/NotificationSlice";

const rootReducer = combineReducers({
    [authAPI.reducerPath]: authAPI.reducer,
    user: userReducer,
    notification: notificationReducer,
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

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];