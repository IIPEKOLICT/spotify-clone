import { useDispatch } from 'react-redux';
import { userActions } from '../slices/AuthSlice';
import { bindActionCreators } from '@reduxjs/toolkit';
import { notificationActions } from '../slices/NotificationSlice';
import { socketActions } from '../slices/SocketSlice';
import { storageActions } from '../slices/StorageSlice';

const actions = {
  ...userActions,
  ...notificationActions,
  ...socketActions,
  ...storageActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
