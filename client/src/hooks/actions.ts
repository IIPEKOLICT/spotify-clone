import { useDispatch } from 'react-redux';
import { authActions } from '../slices/AuthSlice';
import { bindActionCreators } from '@reduxjs/toolkit';
import { notificationActions } from '../slices/NotificationSlice';
import { socketActions } from '../slices/SocketSlice';

const actions = {
  ...authActions,
  ...notificationActions,
  ...socketActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
