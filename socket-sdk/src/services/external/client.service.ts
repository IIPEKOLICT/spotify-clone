import { Socket, io } from 'socket.io-client';
import { SocketAuth, SocketDataWithPayload, SocketTarget } from '../../types/external/data';
import { SocketEvent } from '../../enums/external/events';
import { SubjectService } from '../internal/subject.service';
import { SocketBroadcastEvent } from '../../types/external/events';
import { SOCKET_BROADCAST_EVENTS } from '../../constants/internal/events';
import { IClientService, IInterceptorServiceExternal } from '../../interfaces/external/services';
import { DynamicService } from '../internal/dynamic.service';
import { IDynamicService, IInterceptorService, ISubjectService } from '../../interfaces/internal/services';
import { DynamicAPI } from '../../types/external/dynamic';
import { InterceptorService } from '../internal/interceptor.service';
import { SOCKET_SUBSCRIBE_STRATEGY } from '../../constants/internal/strategy';

export class ClientService implements IClientService {
  protected readonly socketClient: Socket;
  protected readonly subjectService: ISubjectService;
  protected readonly dynamicService: IDynamicService;
  protected readonly interceptorService: IInterceptorService;

  protected authBlock: SocketAuth;
  protected readonly api: DynamicAPI;

  constructor(socketServerHost: string, private readonly defaultAuthBlock: SocketAuth) {
    this.socketClient = io(socketServerHost, {
      autoConnect: true,
      upgrade: false,
      transports: ['websocket'],
    });

    this.authBlock = defaultAuthBlock;
    this.interceptorService = new InterceptorService();
    this.subjectService = new SubjectService(this.interceptorService, this);
    this.dynamicService = new DynamicService(this.subjectService, this);
    this.api = this.dynamicService.generateModule(SOCKET_SUBSCRIBE_STRATEGY);
  }

  auth(authBlock: SocketAuth = this.defaultAuthBlock) {
    this.authBlock = authBlock;
    this.socketClient.emit(SocketEvent.AUTH, authBlock);
  }

  logout() {
    this.authBlock = this.defaultAuthBlock;
    this.socketClient.emit(SocketEvent.LOGOUT, { id: this.socketClient.id });
  }

  join(target: SocketTarget) {
    this.socketClient.emit(SocketEvent.JOIN, { auth: this.authBlock, target });
  }

  leave(target: SocketTarget) {
    this.socketClient.emit(SocketEvent.LEAVE, { auth: this.authBlock, target });
  }

  send(target: SocketTarget, event: SocketEvent, payload: object | undefined = undefined) {
    this.socketClient.emit(event, { auth: this.authBlock, target, payload });
  }

  notify<Payload extends object | undefined = undefined>(event: SocketEvent, target: SocketTarget, payload: Payload) {
    this.join(target);
    this.send(target, event, payload);
    this.leave(target);
  }

  onInit(auth: SocketAuth | boolean = false) {
    if (typeof auth === 'boolean' && auth) {
      this.auth();
    }

    if (typeof auth === 'object') {
      this.auth(auth);
    }

    SOCKET_BROADCAST_EVENTS.forEach((event: SocketBroadcastEvent) => {
      this.socketClient.on(event, (data: SocketDataWithPayload) => {
        this.subjectService.trigger(event, data);
      });
    });
  }

  onDestroy() {
    this.interceptorService.clear();
    this.subjectService.unsubscribeAll();
    this.socketClient.offAny();
    this.socketClient.offAnyOutgoing();
    this.socketClient.disconnect();
  }

  get dynamic(): DynamicAPI {
    return this.api;
  }

  get interceptors(): IInterceptorServiceExternal {
    return {
      add: this.interceptorService.add.bind(this.interceptorService),
      remove: this.interceptorService.remove.bind(this.interceptorService),
    };
  }

  get isConnected(): boolean {
    return this.socketClient.connected;
  }
}
