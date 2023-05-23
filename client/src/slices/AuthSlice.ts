import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserModel } from '../types/models';

const initialState: UserModel | Record<string, any> = {};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<UserModel>) {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
  },
});

export const userActions = authSlice.actions;
export const userReducer = authSlice.reducer;
