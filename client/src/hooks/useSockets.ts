import { useAppSelector } from './redux';
import { UserModel } from '../types/models';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { SocketClient, SocketSubscribeReturnType, ISocketInterceptor } from '@yumasoft-spotify/socket-sdk';
import { REACT_APP_SOCKET_SERVER_URL } from '../constants/environment';
import { useActions } from './actions';

const client = new SocketClient(REACT_APP_SOCKET_SERVER_URL, {
  userId: 'client',
  username: 'Client',
});

export const useSockets = () => {
  const currentInstanceId = useAppSelector((state) => Object.keys(state.socket.hookInstances).length + 1);
  const user = useAppSelector((state) => state.user as UserModel | undefined);

  const [instanceId, setInstanceId] = useState<number>(-1);

  const { newSocketHookInstance, addSocketInterceptor, executeSocketEventInterceptors, clearSocketEventInterceptors } =
    useActions();

  const socketInterceptor: MutableRefObject<ISocketInterceptor> = useRef({
    onSubscribe(subscribeReturn: SocketSubscribeReturnType) {
      addSocketInterceptor({ id: instanceId, onDestroy: () => subscribeReturn.unsubscribe() });
    },
  });

  const applicationScope = {
    onInit() {
      client.onInit(user?._id ? { userId: user._id, username: `${user.firstName} ${user.lastName}` } : true);
    },
    onDestroy() {
      client.onDestroy();
    },
    logout() {
      if (client.isConnected) {
        client.logout();
      }
    },
  };

  const hookScope = {
    onInit() {
      setInstanceId(() => currentInstanceId);
      newSocketHookInstance({ id: instanceId });
      client.interceptors.add(socketInterceptor.current);
    },
    onDestroy() {
      executeSocketEventInterceptors({ id: instanceId, onDestroy: true });
      clearSocketEventInterceptors({ id: instanceId, onDestroy: true });
      client.interceptors.remove(socketInterceptor.current);
    },
  };

  useEffect(() => {
    hookScope.onInit();
    return () => hookScope.onDestroy();
  }, []);

  return {
    ...applicationScope,
    ...client.dynamic,
  };
};
