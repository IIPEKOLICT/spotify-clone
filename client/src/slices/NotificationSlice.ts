import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationState {
  type?: 'error' | 'success' | '';
  message?: string;
}

const initialState: NotificationState = {
  type: '',
  message: '',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state, action: PayloadAction<NotificationState>) {
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
  },
});

export const notificationActions = notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;
