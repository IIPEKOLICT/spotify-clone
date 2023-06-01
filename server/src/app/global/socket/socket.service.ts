import { EnvironmentService } from '../environment/environment.service';
import { Injectable } from '@nestjs/common';
import { SocketClient } from '@yumasoft-spotify/socket-sdk';

@Injectable()
export class SocketService extends SocketClient {
  constructor(environmentService: EnvironmentService) {
    super(environmentService.SOCKET_SERVER_URL, { userId: -1, username: 'Server' });
    this.auth();
  }
}
