import { useDispatch } from 'react-redux';
import { userActions } from '../slices/AuthSlice';
import { bindActionCreators } from '@reduxjs/toolkit';
import { notificationActions } from '../slices/NotificationSlice';
import { socketActions } from '../slices/SocketSlice';

const actions = {
  ...userActions,
  ...notificationActions,
  ...socketActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
