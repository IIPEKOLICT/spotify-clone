import { SocketSubscribeReturnType } from '../../types/external/functions';

export interface ISocketInterceptor {
  onSubscribe(subscribeReturn: SocketSubscribeReturnType): void;
}
