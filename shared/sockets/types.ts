import { SocketEntity, SocketPlace } from './enums';

export type SocketAuth = {
  userId: number;
  username: string;
};

export type SocketTarget = {
  place: SocketPlace;
  entity: SocketEntity;
  entityId?: number;
  userId?: number;
};

export type SocketData = {
  auth: SocketAuth;
  target: SocketTarget;
};

export type SocketDataWithPayload<Payload extends object = object> = SocketData & {
  payload: Payload;
};
