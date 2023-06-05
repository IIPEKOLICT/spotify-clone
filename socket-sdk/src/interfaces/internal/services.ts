import { SocketBroadcastEvent } from '../../types/external/events';
import { SocketDataWithPayload, SocketTarget } from '../../types/external/data';
import { SocketEvent } from '../../enums/external/events';
import { SocketSubscriber, SocketSubscribeReturnType } from '../../types/external/functions';
import { DynamicAPI } from '../../types/external/dynamic';
import { ISocketInterceptor } from '../external/custom';
import { Strategy, StrategyCaseTarget } from '../../types/internal/strategy';

export interface ISubjectService {
  subscribe<Payload extends object | undefined = undefined>(
    event: SocketBroadcastEvent,
    roomOrTarget: SocketTarget | string,
    subscriber: SocketSubscriber<Payload>,
  ): SocketSubscribeReturnType;

  unsubscribe<Payload extends object | undefined = undefined>(subscriber: SocketSubscriber<Payload>): void;

  unsubscribeFromCaseAndEvent(event: SocketBroadcastEvent, target: StrategyCaseTarget): void;

  unsubscribeFromCase(target: StrategyCaseTarget): void;

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
  generateModule(strategy: Strategy): DynamicAPI;
}

export interface IInterceptorService {
  add(...interceptors: ISocketInterceptor[]): void;
  remove(...interceptors: ISocketInterceptor[]): void;
  clear(): void;
  onSubscribe(subscribeReturn: SocketSubscribeReturnType): void;
}
