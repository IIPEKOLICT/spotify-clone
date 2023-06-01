import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authAPI } from '../services/AuthService';
import { userReducer } from '../slices/AuthSlice';
import { notificationReducer } from '../slices/NotificationSlice';
import { userAPI } from '../services/UserService';
import { socketActions, socketName, socketReducer } from '../slices/SocketSlice';

const rootReducer = combineReducers({
  [authAPI.reducerPath]: authAPI.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
  user: userReducer,
  notification: notificationReducer,
  socket: socketReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: Object.keys(socketActions).map((name: string) => [socketName, name].join('/')),
          ignoredPaths: [socketName],
        },
      }).concat([authAPI.middleware, userAPI.middleware]),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
