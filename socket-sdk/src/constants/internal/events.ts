import { SocketBroadcastEvent } from '../../types/external/events';
import { SocketEvent } from '../../enums/external/events';

export const SOCKET_BROADCAST_EVENTS: SocketBroadcastEvent[] = [
  SocketEvent.EDIT,
  SocketEvent.NEW,
  SocketEvent.TYPING,
  SocketEvent.JOINED,
  SocketEvent.REMOVE,
  SocketEvent.STOP_TYPING,
];
