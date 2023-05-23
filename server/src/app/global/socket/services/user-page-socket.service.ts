import { SocketService } from './socket.service';
import { Injectable } from '@nestjs/common';
import { SocketEntity, SocketEvent, SocketPlace } from '../../../../../../shared/sockets/enums';
import { UserStatus } from '../../../../constants/enums';

@Injectable()
export class UserPageSocketService {
  constructor(private readonly socketService: SocketService) {}

  editUserStatus(userId: number, value: UserStatus) {
    return this.socketService.notify(
      SocketEvent.EDIT,
      {
        place: SocketPlace.USER_PAGE,
        entity: SocketEntity.USER_STATUS,
        userId,
      },
      {
        value,
      },
    );
  }
}
