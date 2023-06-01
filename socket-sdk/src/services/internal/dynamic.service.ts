import { SocketBroadcastEvent } from '../../types/external/events';
import { IClientServiceInternal, IDynamicService, ISubjectService } from '../../interfaces/internal/services';
import { SOCKET_BROADCAST_EVENTS } from '../../constants/internal/events';
import { SocketScope } from '../../enums/internal/data';
import { DynamicAPI } from '../../types/external/dynamic';
import { SubscribeStrategy, SubscribeStrategyCase } from '../../types/internal/data';
import { SocketSubscriber, SocketSubscribeReturnType } from '../../types/external/functions';

export class DynamicService implements IDynamicService {
  constructor(private readonly subject: ISubjectService, private readonly client: IClientServiceInternal) {}

  private static capitalize(input: string): string {
    const letters: string[] = input.split('');
    const first: string = letters[0].toUpperCase();
    const otherLetters: string = letters.filter((_, index: number) => index).join('');
    return first + otherLetters;
  }

  private generateSubscribeMethod = <Payload extends object | undefined>(
    config: SubscribeStrategyCase<Payload>,
    event: SocketBroadcastEvent,
  ) => {
    const { place, entity, idField } = config;

    return (id: number, subscriber: SocketSubscriber<Payload>): SocketSubscribeReturnType => {
      return this.subject.subscribe<Payload>(event, { place, entity, [idField]: id }, subscriber);
    };
  };

  private generateUnsubscribeFromCaseAndEventMethod = <Payload extends object | undefined>(
    config: SubscribeStrategyCase<Payload>,
    event: SocketBroadcastEvent,
  ) => {
    const { place, entity, idField } = config;

    return () => {
      this.subject.unsubscribeFromCaseAndEvent(
        event,
        { place, entity },
        idField === 'userId' ? SocketScope.USER : SocketScope.ENTITY,
      );
    };
  };

  private generateUnsubscribeFromCaseMethod = <Payload extends object | undefined>(
    config: SubscribeStrategyCase<Payload>,
  ) => {
    const { place, entity, idField } = config;

    return () => {
      this.subject.unsubscribeFromCase({ place, entity }, idField === 'userId' ? SocketScope.USER : SocketScope.ENTITY);
    };
  };

  private generateTriggerMethod = <Payload extends object | undefined>(
    config: SubscribeStrategyCase<Payload>,
    event: SocketBroadcastEvent,
  ) => {
    const { place, entity, idField } = config;

    return (id: number, payload: Payload) => {
      this.client.notify(event, { place, entity, [idField]: id }, payload);
    };
  };

  generateModule(strategy: SubscribeStrategy): DynamicAPI {
    const module: DynamicAPI = {} as DynamicAPI;

    Object.keys(strategy).forEach((caseName: string) => {
      module[caseName] = {} as any;

      SOCKET_BROADCAST_EVENTS.forEach((event: SocketBroadcastEvent) => {
        const subscribeMethodName = `subscribeOn${DynamicService.capitalize(event)}Event`;
        const subscribeMethod = this.generateSubscribeMethod(strategy[caseName], event);

        module[caseName][subscribeMethodName] = subscribeMethod.bind(this);

        const unsubscribeFromCaseAndEventMethodName = `unsubscribeFromAll${DynamicService.capitalize(event)}EventRooms`;

        const unsubscribeFromCaseAndEventMethod = this.generateUnsubscribeFromCaseAndEventMethod(
          strategy[caseName],
          event,
        );

        module[caseName][unsubscribeFromCaseAndEventMethodName] = unsubscribeFromCaseAndEventMethod.bind(this);

        const triggerMethodName = `trigger${DynamicService.capitalize(event)}Event`;
        const triggerMethod = this.generateTriggerMethod(strategy[caseName], event);

        module[caseName][triggerMethodName] = triggerMethod.bind(this);
      });

      const unsubscribeFromCaseMethod = this.generateUnsubscribeFromCaseMethod(strategy[caseName]);

      module[caseName]['unsubscribeFromAllEvents'] = unsubscribeFromCaseMethod.bind(this);
    });

    return module;
  }
}
