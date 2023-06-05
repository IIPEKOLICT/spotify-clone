import { SocketBroadcastEvent } from '../external/events';
import { SocketTarget } from '../external/data';

export type StrategyCaseEventPayload<Payload extends object | undefined = undefined> = {};

export type StrategyCaseTarget = Pick<SocketTarget, 'place' | 'entity' | 'scope'>;

export type StrategyCaseEventsMap = {
  [Event in SocketBroadcastEvent]?: StrategyCaseEventPayload<any>;
};

export type StrategyCase = {
  target: StrategyCaseTarget;
  events: StrategyCaseEventsMap;
};

export type Strategy = {
  [CaseName: string]: StrategyCase;
};
