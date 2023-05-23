import { SocketEvent } from '../../enums/external/events';

export type SocketBroadcastWithoutPayloadEvent = SocketEvent.JOINED;
export type SocketBroadcastIdPayloadEvent = SocketEvent.REMOVE;
export type SocketBroadcastTypingPayloadEvent = SocketEvent.TYPING | SocketEvent.STOP_TYPING;
export type SocketBroadcastPayloadEvent = SocketEvent.NEW | SocketEvent.EDIT;
