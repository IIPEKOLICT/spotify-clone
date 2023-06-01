import { SocketEvent } from '../../enums/external/events';

export type SocketBroadcastEvent =
  | SocketEvent.JOINED
  | SocketEvent.NEW
  | SocketEvent.EDIT
  | SocketEvent.REMOVE
  | SocketEvent.TYPING
  | SocketEvent.STOP_TYPING;
