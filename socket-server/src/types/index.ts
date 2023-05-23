import { SocketEvent } from '../../../shared/sockets/enums';
import { SocketAuth, SocketData, SocketDataWithPayload } from '../../../shared/sockets/types';

export type SocketIncomeEventHandler = (data: SocketAuth | SocketData | SocketDataWithPayload) => void;
export type SocketOutgoingEventHandler = (data: object) => void;

export type IncomeEventsMap = {
  [Event in Partial<SocketEvent>]: SocketIncomeEventHandler;
};

export type OutgoingEventsMap = {
  [Event in Partial<SocketEvent>]: SocketOutgoingEventHandler;
};
