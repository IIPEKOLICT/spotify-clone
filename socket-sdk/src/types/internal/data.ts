import { SocketBroadcastEvent } from '../external/events';
import { SocketIdField, SocketScope } from '../../enums/internal/data';
import { SocketEntity, SocketPlace } from '../../enums/external/data';
import { SocketSubscriber } from '../external/functions';

export type SubjectStoreParsedId = {
  event: SocketBroadcastEvent;
  roomId: string;
  roomName: string;
  scope: SocketScope;
  place: SocketPlace;
  entity: SocketEntity;
  id: number;
};

export type SubjectStore = Record<string, SocketSubscriber<any>[] | undefined>;

export type SubscribeStrategyCase<Payload extends object | undefined = undefined> = {
  place: SocketPlace;
  entity: SocketEntity;
  idField: SocketIdField;
};

export type SubscribeStrategy = {
  [CaseName: string]: SubscribeStrategyCase<any>;
};
