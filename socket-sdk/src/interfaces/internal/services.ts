import { SocketBroadcastEvent } from '../../types/external/events';
import { SocketDataWithPayload, SocketTarget } from '../../types/external/data';
import { SocketEvent } from '../../enums/external/events';
import { SocketSubscriber, SocketSubscribeReturnType } from '../../types/external/functions';
import { SocketScope } from '../../enums/internal/data';
import { DynamicAPI } from '../../types/external/dynamic';
import { SubscribeStrategy } from '../../types/internal/data';
import { ISocketInterceptor } from '../external/custom';

export interface ISubjectService {
  subscribe<Payload extends object | undefined = undefined>(
    event: SocketBroadcastEvent,
    roomOrTarget: SocketTarget | string,
    subscriber: SocketSubscriber<Payload>,
  ): SocketSubscribeReturnType;

  unsubscribe<Payload extends object | undefined = undefined>(subscriber: SocketSubscriber<Payload>): void;

  unsubscribeFromCaseAndEvent(event: SocketBroadcastEvent, target: SocketTarget, scope: SocketScope): void;

  unsubscribeFromCase(target: SocketTarget, scope: SocketScope): void;

  unsubscribeAll(): void;

  trigger<Payload extends object | undefined = undefined>(
    event: SocketBroadcastEvent,
    data: SocketDataWithPayload<Payload>,
  ): void;
}

export interface IClientServiceInternal {
  join(target: SocketTarget): void;
  leave(target: SocketTarget): void;
  send(target: SocketTarget, event: SocketEvent, payload?: object): void;

  notify<Payload extends object | undefined = undefined>(
    event: SocketEvent,
    target: SocketTarget,
    payload: Payload,
  ): void;
}

export interface IDynamicService {
  generateModule(strategy: SubscribeStrategy): DynamicAPI;
}

export interface IInterceptorService {
  add(...interceptors: ISocketInterceptor[]): void;
  remove(...interceptors: ISocketInterceptor[]): void;
  clear(): void;
  onSubscribe(subscribeReturn: SocketSubscribeReturnType): void;
}
