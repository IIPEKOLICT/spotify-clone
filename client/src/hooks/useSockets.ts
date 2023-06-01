import { useAppSelector } from './redux';
import { UserModel } from '../types/models';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { SocketClient, SocketSubscribeReturnType, ISocketInterceptor } from '@spotify/socket-sdk';
import { REACT_APP_SOCKET_SERVER_URL } from '../constants/environment';
import { useActions } from './actions';

const client = new SocketClient(REACT_APP_SOCKET_SERVER_URL, {
  userId: -1,
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
      client.onInit(user?.id ? { userId: user.id, username: `${user.firstName} ${user.lastName}` } : true);
    },
    onDestroy() {
      client.onDestroy();
    },
    logout() {
      client.logout();
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

  const logout = () => {
    if (client.isConnected) {
      applicationScope.logout();
    }
  };

  useEffect(() => {
    hookScope.onInit();
    return () => hookScope.onDestroy();
  }, []);

  return {
    onApplicationInit: () => applicationScope.onInit(),
    onApplicationDestroy: () => applicationScope.onDestroy(),
    logout,
    ...client.dynamic,
  };
};
