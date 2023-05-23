import { SocketDataWithPayload, SocketTarget } from '../../types/external/data';
import { SocketBroadcastEvent } from '../../types/external/events';
import { getRoomName } from '../../functions/external/getters';
import { IClientServiceInternal, IInterceptorService, ISubjectService } from '../../interfaces/internal/services';
import { SocketSubscriber, SocketSubscribeReturnType, VoidCallback } from '../../types/external/functions';
import { SocketIdField, SocketScope } from '../../enums/internal/data';
import { SubjectStore, SubjectStoreParsedId } from '../../types/internal/data';
import { SocketEntity, SocketPlace } from '../../enums/external/data';

export class SubjectService implements ISubjectService {
  private readonly store: SubjectStore = {};

  constructor(
    private readonly interceptorService: IInterceptorService,
    private readonly clientService: IClientServiceInternal,
  ) {}

  private generateId(event: SocketBroadcastEvent, roomName: string): string {
    return `${event}:::${roomName}`;
  }

  private parseId(storeId: string): SubjectStoreParsedId {
    const [event, roomId, scope] = storeId.split(':::');
    const [place, entity, id] = roomId.split(':');

    return {
      event: (event ?? '') as SocketBroadcastEvent,
      roomId: roomId ?? '',
      roomName: `${roomId}:::${scope}`,
      scope: (scope ?? '') as SocketScope,
      place: (place ?? '') as SocketPlace,
      entity: (entity ?? '') as SocketEntity,
      id: typeof id === 'string' ? +id : -1,
    };
  }

  private convertScopeToIdField(scope: SocketScope): SocketIdField {
    return scope.toString() === SocketScope.USER.toString() ? SocketIdField.USER_ID : SocketIdField.ENTITY_ID;
  }

  private getTargetFromRoomName(roomName: string): SocketTarget {
    const { place, entity, scope, id } = this.parseId(`:::${roomName}`);

    return {
      place,
      entity,
      [this.convertScopeToIdField(scope)]: id,
    };
  }

  subscribe<Payload extends object | undefined = undefined>(
    event: SocketBroadcastEvent,
    roomOrTarget: SocketTarget | string,
    subscriber: SocketSubscriber<Payload>,
  ): SocketSubscribeReturnType {
    let target: SocketTarget;
    let roomName: string;

    if (typeof roomOrTarget === 'string') {
      roomName = roomOrTarget;
      target = this.getTargetFromRoomName(roomOrTarget);
    } else {
      target = roomOrTarget;
      roomName = getRoomName(roomOrTarget);
    }

    const id: string = this.generateId(event, roomName);

    if (!this.store[id]) {
      this.store[id] = [];
    }

    this.store[id].push(subscriber);
    this.clientService.join(target);

    const unsubscribe: VoidCallback = () => this.unsubscribe(subscriber);

    const subscribeReturn: SocketSubscribeReturnType = {
      roomName,
      unsubscribe,
    };

    this.interceptorService.onSubscribe(subscribeReturn);
    return subscribeReturn;
  }

  unsubscribe<Payload extends object | undefined = undefined>(subscriber: SocketSubscriber<Payload>) {
    Object.keys(this.store).forEach((id: string) => {
      const isSubscriberHere: boolean = (this.store[id] ?? []).some((sub: SocketSubscriber<any>) => sub === subscriber);

      if (isSubscriberHere) {
        this.store[id] = this.store[id].filter((sub: SocketSubscriber<any>) => sub !== subscriber);
        this.clientService.leave(this.getTargetFromRoomName(this.parseId(id).roomName));
      }
    });
  }

  unsubscribeFromCaseAndEvent(event: SocketBroadcastEvent, target: SocketTarget, scope: SocketScope) {
    Object.keys(this.store).forEach((id: string) => {
      const { event: storeEvent, place, entity, scope, roomName } = this.parseId(id);

      const targetScope: SocketScope = target.entityId ? SocketScope.ENTITY : SocketScope.USER;

      const currentParams = `${storeEvent}|${place}|${entity}|${scope}`;
      const targetParams = `${event}|${target.place}|${target.entity}|${targetScope}`;

      if (currentParams === targetParams) {
        this.store[id] = [];
        this.clientService.leave(this.getTargetFromRoomName(roomName));
      }
    });
  }

  unsubscribeFromCase(target: SocketTarget, scope: SocketScope) {
    Object.keys(this.store).forEach((id: string) => {
      const { place, entity, scope, roomName } = this.parseId(id);

      const targetScope: SocketScope = target.entityId ? SocketScope.ENTITY : SocketScope.USER;

      const currentParams = `${place}|${entity}|${scope}`;
      const targetParams = `${target.place}|${target.entity}|${targetScope}`;

      if (currentParams === targetParams) {
        this.store[id] = [];
        this.clientService.leave(this.getTargetFromRoomName(roomName));
      }
    });
  }

  unsubscribeAll() {
    Object.keys(this.store).forEach((id: string) => {
      this.store[id] = [];
      this.clientService.leave(this.getTargetFromRoomName(this.parseId(id).roomName));
    });
  }

  trigger<Payload extends object | undefined = undefined>(
    event: SocketBroadcastEvent,
    data: SocketDataWithPayload<Payload>,
  ) {
    try {
      Object.keys(this.store).forEach((id: string) => {
        const { event: targetEvent, roomName } = this.parseId(id);

        if (targetEvent.toString() !== event.toString() || !this.store[id] || roomName !== getRoomName(data.target)) {
          return;
        }

        this.store[id].forEach((subscriber: SocketSubscriber<any>) => subscriber(data.payload));
      });
    } catch (error) {
      console.error(`Error during socket event trigger`, error);
    }
  }
}
