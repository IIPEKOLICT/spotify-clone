import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserModel } from '../types/models';
import { SessionStorageKey } from '../constants/enums';

interface AuthState {
  user?: UserModel;
  accessToken?: string;
}

const initialState: AuthState = {};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserModel>) {
      state.user = action.payload;
    },
    setAccessToken(state, action: PayloadAction<string | undefined>) {
      if (action.payload) {
        state.accessToken = action.payload;
        return;
      }

      const accessToken: string | null = sessionStorage.getItem(SessionStorageKey.ACCESS_TOKEN);

      if (accessToken) {
        state.accessToken = accessToken;
      }
    },
    removeAccessToken(state, _) {
      delete state.accessToken;
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
