import { SocketEntity, SocketPlace } from '../../enums/external/data';
import { UserStatus } from '../../enums/external/model';
import { SocketIdField, SocketScope } from '../../enums/internal/data';
import { SubscribeStrategyCase } from '../../types/internal/data';

const declareCase = <Payload extends object | undefined = undefined>(
  place: SocketPlace,
  entity: SocketEntity,
  scope: SocketScope,
): SubscribeStrategyCase<Payload> => {
  return {
    place,
    entity,
    idField: scope === SocketScope.USER ? SocketIdField.USER_ID : SocketIdField.ENTITY_ID,
  };
};

export const SOCKET_SUBSCRIBE_STRATEGY = {
  userStatusOnUserPage: declareCase<{ value: UserStatus }>(
    SocketPlace.USER_PAGE,
    SocketEntity.USER_STATUS,
    SocketScope.ENTITY,
  ),
};
