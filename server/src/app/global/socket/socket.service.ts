import { EnvironmentService } from '../environment/environment.service';
import { Injectable } from '@nestjs/common';
import { SocketClient } from '@spotify/sockets-shared';

@Injectable()
export class SocketService extends SocketClient {
  constructor(environmentService: EnvironmentService) {
    super(environmentService.SOCKET_SERVER_URL, { userId: -1, username: 'Server' });
    this.auth();
  }
}
