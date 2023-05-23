import { EnvironmentService } from '../../environment/environment.service';
import { io, Socket } from 'socket.io-client';
import { SocketEvent } from '../../../../../../shared/sockets/enums';
import { SocketAuth, SocketTarget } from '../../../../../../shared/sockets/types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SocketService {
  protected readonly socketClient: Socket;

  constructor(private readonly environmentService: EnvironmentService) {
    this.socketClient = io(environmentService.SOCKET_SERVER_URL, {
      autoConnect: true,
      transports: ['websocket'],
    });

    this.auth();
  }

  protected get authBlock(): SocketAuth {
    return { username: 'server', userId: -1 };
  }

  protected auth() {
    this.socketClient.emit(SocketEvent.AUTH, this.authBlock);
  }

  protected join(target: SocketTarget) {
    this.socketClient.emit(SocketEvent.JOIN, { auth: this.authBlock, target });
  }

  protected leave(target: SocketTarget) {
    this.socketClient.emit(SocketEvent.LEAVE, { auth: this.authBlock, target });
  }

  protected send(target: SocketTarget, event: SocketEvent, payload: object | undefined = undefined) {
    this.socketClient.emit(event, { auth: this.authBlock, target, payload });
  }

  notify(event: SocketEvent, target: SocketTarget, payload: object | undefined = undefined) {
    this.join(target);
    this.send(target, event, payload);
    this.leave(target);
  }
}
