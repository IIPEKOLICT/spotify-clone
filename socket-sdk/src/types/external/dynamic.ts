import { ExternalSocketSubscribeMethod, ExternalSocketTriggerMethod, VoidCallback } from './functions';
import { StrategyCaseEventPayload } from '../internal/strategy';
import { SOCKET_SUBSCRIBE_STRATEGY } from '../../constants/internal/strategy';

type StrategyType = typeof SOCKET_SUBSCRIBE_STRATEGY;

type StrategyCases = Extract<keyof StrategyType, string>;

type PayloadType<
  Case extends StrategyCases,
  Event extends StrategyCaseEvents<Case>,
> = StrategyType[Case]['events'][Event] extends StrategyCaseEventPayload<infer Generic> ? Generic : never;

type StrategyCaseEvents<Case extends StrategyCases> = keyof StrategyType[Case]['events'] & string;

type SubscribeModule<Case extends StrategyCases> = {
  [Event in StrategyCaseEvents<Case> as `subscribeOn${Capitalize<Event>}Event`]: ExternalSocketSubscribeMethod<
    PayloadType<Case, Event>
  >;
};

type UnsubscribeEventModule<Case extends StrategyCases> = {
  [Event in StrategyCaseEvents<Case> as `unsubscribeFromAll${Capitalize<Event>}EventRooms`]: StrategyType[Case]['events'][Event] extends undefined
    ? never
    : VoidCallback;
};

type UnsubscribeCaseModule = {
  unsubscribeFromAllEvents(): void;
};

type TriggerModule<Case extends StrategyCases> = {
  [Event in StrategyCaseEvents<Case> as `trigger${Capitalize<Event>}Event`]: ExternalSocketTriggerMethod<
    PayloadType<Case, Event>
  >;
};

export type DynamicAPI = {
  [Case in StrategyCases]: SubscribeModule<Case> &
    UnsubscribeEventModule<Case> &
    UnsubscribeCaseModule &
    TriggerModule<Case>;
};
