import { SocketScope } from '../../enums/internal/data';
import { SocketTarget } from '../../types/external/data';

export const getId = (target: SocketTarget, userId?: number): number => {
  return target.entityId ?? target.userId ?? userId ?? -1;
};

export const getRoomName = (target: SocketTarget, userId?: number): string => {
  return `${target.place}:${target.entity}:${getId(target, userId)}:::${
    target.entityId ? SocketScope.ENTITY : SocketScope.USER
  }`;
};
