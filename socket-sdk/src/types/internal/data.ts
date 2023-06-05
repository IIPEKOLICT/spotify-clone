import { SocketBroadcastEvent } from '../external/events';
import { SocketEntity, SocketPlace, SocketScope } from '../../enums/external/data';
import { SocketSubscriber } from '../external/functions';
import { SocketEvent } from '../../enums/external/events';
import { IncomeEventHandler, OutgoingEventHandler } from './functions';

export type SubjectStoreParsedId = {
  event: SocketBroadcastEvent;
  roomName: string;
  scope: SocketScope;
  place: SocketPlace;
  entity: SocketEntity;
  id: string;
};

export type SubjectStore = Record<string, SocketSubscriber<any>[] | undefined>;

export type IncomeEventsMap = {
  [Event in Partial<SocketEvent>]: IncomeEventHandler;
};

export type OutgoingEventsMap = {
  [Event in Partial<SocketBroadcastEvent>]: OutgoingEventHandler;
};
