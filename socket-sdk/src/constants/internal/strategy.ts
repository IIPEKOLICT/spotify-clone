import { SocketEntity, SocketPlace, SocketScope } from '../../enums/external/data';
import { UserStatus } from '../../enums/external/model';
import { SocketEvent } from '../../enums/external/events';
import { StrategyCaseEventPayload } from '../../types/internal/strategy';

const declarePayloadType = <Payload extends object | undefined = undefined>(): StrategyCaseEventPayload<Payload> => {
  return {};
};

export const SOCKET_SUBSCRIBE_STRATEGY = {
  userStatusOnUserPage: {
    target: {
      place: SocketPlace.USER_PAGE,
      entity: SocketEntity.USER_STATUS,
      scope: SocketScope.ENTITY,
    },
    events: {
      [SocketEvent.EDIT]: declarePayloadType<{ value: UserStatus }>(),
    },
  },
};
