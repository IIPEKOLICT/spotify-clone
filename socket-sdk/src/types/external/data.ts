import { SocketEntity, SocketPlace, SocketScope } from '../../enums/external/data';

export type SocketAuth = {
  userId: string;
  username: string;
};

export type SocketTarget = {
  place: SocketPlace;
  entity: SocketEntity;
  scope: SocketScope;
  id: string;
};

export type SocketData = {
  auth: SocketAuth;
  target: SocketTarget;
};

export type SocketDataWithPayload<Payload extends object = object> = SocketData & {
  payload: Payload;
};
