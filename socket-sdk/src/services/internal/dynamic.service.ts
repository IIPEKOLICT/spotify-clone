import { SocketBroadcastEvent } from '../../types/external/events';
import { IClientServiceInternal, IDynamicService, ISubjectService } from '../../interfaces/internal/services';
import { DynamicAPI } from '../../types/external/dynamic';
import {
  ExternalSocketSubscribeMethod,
  SocketSubscriber,
  SocketSubscribeReturnType,
  VoidCallback,
} from '../../types/external/functions';
import { Strategy, StrategyCaseEventsMap, StrategyCaseTarget } from '../../types/internal/strategy';

export class DynamicService implements IDynamicService {
  constructor(private readonly subject: ISubjectService, private readonly client: IClientServiceInternal) {}

  private static capitalize(input: string): string {
    const letters: string[] = input.split('');
    const first: string = letters[0].toUpperCase();
    const otherLetters: string = letters.filter((_, index: number) => index).join('');
    return first + otherLetters;
  }

  private generateSubscribeMethod = <Payload extends object | undefined>(
    target: StrategyCaseTarget,
    event: SocketBroadcastEvent,
  ): ExternalSocketSubscribeMethod<Payload> => {
    return (id: string, subscriber: SocketSubscriber<Payload>): SocketSubscribeReturnType => {
      return this.subject.subscribe<Payload>(event, { ...target, id }, subscriber);
    };
  };

  private generateUnsubscribeFromCaseAndEventMethod = (
    target: StrategyCaseTarget,
    event: SocketBroadcastEvent,
  ): VoidCallback => {
    return () => {
      this.subject.unsubscribeFromCaseAndEvent(event, target);
    };
  };

  private generateUnsubscribeFromCaseMethod = (target: StrategyCaseTarget): VoidCallback => {
    return () => {
      this.subject.unsubscribeFromCase(target);
    };
  };

  private generateTriggerMethod = <Payload extends object | undefined = undefined>(
    target: StrategyCaseTarget,
    event: SocketBroadcastEvent,
  ) => {
    return (id: string, payload: Payload) => {
      this.client.notify(event, { ...target, id }, payload);
    };
  };

  generateModule(strategy: Strategy): DynamicAPI {
    const module: DynamicAPI = {} as DynamicAPI;

    Object.keys(strategy).forEach((caseName: string) => {
      module[caseName] = {} as any;

      const caseTarget: StrategyCaseTarget = strategy[caseName].target;
      const eventsMap: StrategyCaseEventsMap = strategy[caseName].events;

      Object.keys(eventsMap).forEach((event: SocketBroadcastEvent) => {
        const capitalizedEventName: string = DynamicService.capitalize(event);

        const subscribeMethodName = `subscribeOn${capitalizedEventName}Event`;
        const subscribeMethod = this.generateSubscribeMethod(caseTarget, event);

        module[caseName][subscribeMethodName] = subscribeMethod.bind(this);

        const unsubscribeFromCaseAndEventMethodName = `unsubscribeFromAll${capitalizedEventName}EventRooms`;
        const unsubscribeFromCaseAndEventMethod = this.generateUnsubscribeFromCaseAndEventMethod(caseTarget, event);

        module[caseName][unsubscribeFromCaseAndEventMethodName] = unsubscribeFromCaseAndEventMethod.bind(this);

        const triggerMethodName = `trigger${capitalizedEventName}Event`;
        const triggerMethod = this.generateTriggerMethod(caseTarget, event);

        module[caseName][triggerMethodName] = triggerMethod.bind(this);
      });

      const unsubscribeFromCaseMethod = this.generateUnsubscribeFromCaseMethod(caseTarget);

      module[caseName]['unsubscribeFromAllEvents'] = unsubscribeFromCaseMethod.bind(this);
    });

    return module;
  }
}
