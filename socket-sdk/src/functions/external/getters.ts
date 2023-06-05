import { SocketTarget } from '../../types/external/data';

export const getId = (target: SocketTarget, userId?: string): string => {
  return target.id ?? userId ?? 'anonymous';
};

export const getRoomName = (target: SocketTarget, userId?: string): string => {
  return `${target.place}:${target.entity}:${target.scope}:${getId(target, userId)}`;
};
