import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SessionStorageKey } from '../constants/enums';

type StorageState = {
  accessToken?: string;
};

const initialState: StorageState = {};

const storageSlice = createSlice({
  name: 'storage',
  initialState,
  reducers: {
    loadAccessToken(state, _) {
      const accessToken: string | null = sessionStorage.getItem(SessionStorageKey.ACCESS_TOKEN);

      if (accessToken) {
        state.accessToken = accessToken;
      }
    },
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
    removeAccessToken(state, _) {
      delete state.accessToken;
    },
  },
});

export const storageActions = storageSlice.actions;
export const storageReducer = storageSlice.reducer;
