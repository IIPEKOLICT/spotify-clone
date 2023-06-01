import { SOCKET_SUBSCRIBE_STRATEGY } from '../../constants/internal/configuration';
import { ExternalSocketSubscribeMethod, ExternalSocketTriggerMethod, VoidCallback } from './functions';
import { SocketEvent } from '../../enums/external/events';
import {
  SocketBroadcastTypingPayloadEvent,
  SocketBroadcastWithoutPayloadEvent,
  SocketBroadcastPayloadEvent,
  SocketBroadcastIdPayloadEvent,
} from '../internal/events';
import { IdEventPayload, TypingEventPayload } from '../internal/payload';
import { SocketBroadcastEvent } from './events';
// import { UserStatus } from '../../enums/external/model';
import { SubscribeStrategyCase } from '../internal/data';

type StrategyType = typeof SOCKET_SUBSCRIBE_STRATEGY;

type StrategyCases = Extract<keyof StrategyType, string>;

type PayloadType<Case extends StrategyCases> = StrategyType[Case] extends SubscribeStrategyCase<infer Generic>
  ? Generic
  : never;

type SubscribeModule<Events extends SocketEvent, Payload extends object | undefined = undefined> = {
  [Event in Events as `subscribeOn${Capitalize<Event>}Event`]: ExternalSocketSubscribeMethod<Payload>;
};

type UnsubscribeEventModule = {
  [Event in SocketBroadcastEvent as `unsubscribeFromAll${Capitalize<Event>}EventRooms`]: VoidCallback;
};

type UnsubscribeCaseModule = {
  unsubscribeFromAllEvents(): void;
};

type TriggerModule<Events extends SocketEvent, Payload extends object | undefined = undefined> = {
  [Event in Events as `trigger${Capitalize<Event>}Event`]: ExternalSocketTriggerMethod<Payload>;
};

export type DynamicAPI = {
  [Case in StrategyCases]: SubscribeModule<SocketBroadcastPayloadEvent, PayloadType<Case>> &
    SubscribeModule<SocketBroadcastTypingPayloadEvent, TypingEventPayload> &
    SubscribeModule<SocketBroadcastIdPayloadEvent, IdEventPayload> &
    SubscribeModule<SocketBroadcastWithoutPayloadEvent> &
    UnsubscribeEventModule &
    UnsubscribeCaseModule &
    TriggerModule<SocketBroadcastPayloadEvent, PayloadType<Case>> &
    TriggerModule<SocketBroadcastTypingPayloadEvent, TypingEventPayload> &
    TriggerModule<SocketBroadcastIdPayloadEvent, IdEventPayload> &
    TriggerModule<SocketBroadcastWithoutPayloadEvent>;
};
//
// const dynamic: DynamicAPI = {};
//
// const { roomName, unsubscribe } = dynamic.userStatusOnUserPage.subscribeOnNewEvent(2, (data) => {});
// dynamic.userStatusOnUserPage.subscribeOnNewEvent(1, (data) => {});
// dynamic.userStatusOnUserPage.subscribeOnRemove((data) => {});
// dynamic.userStatusOnUserPage.subscribeOnTyping((data) => {});
// dynamic.userStatusOnUserPage.subscribeOnStop_typing((data) => {});
// dynamic.userStatusOnUserPage.subscribeOnJoined((data) => {});
// dynamic.userStatusOnUserPage.unsubscribeFromAllNewRooms();
// dynamic.userStatusOnUserPage.unsubscribeFromAllEditRooms();
// dynamic.userStatusOnUserPage.unsubscribeFromAllJoinedRooms();
// dynamic.userStatusOnUserPage.unsubscribeFromAllRemoveRooms();
// dynamic.userStatusOnUserPage.unsubscribeFromAllTypingRooms();
// dynamic.userStatusOnUserPage.unsubscribeFromAllStop_typingRooms();
// dynamic.userStatusOnUserPage.unsubscribeFromAllEvents();
// dynamic.userStatusOnUserPage.triggerNewEvent(1, { value: UserStatus.ONLINE });
// dynamic.userStatusOnUserPage.triggerEditEvent(1, { value: UserStatus.ONLINE });
// dynamic.userStatusOnUserPage.triggerRemoveEvent(1, { id: 2 });
// dynamic.userStatusOnUserPage.triggerTypingEvent(1, { userId: 1, username: 'Oleg' });
// dynamic.userStatusOnUserPage.triggerStop_typingEvent(1, { userId: 1, username: 'Oleg' });
// dynamic.userStatusOnUserPage.triggerJoinedEvent(1);
