import { Global, Module } from '@nestjs/common';
import { UserPageSocketService } from './services/user-page-socket.service';
import { SocketService } from './services/socket.service';

@Global()
@Module({
  providers: [SocketService, UserPageSocketService],
  exports: [UserPageSocketService],
})
export class SocketModule {}
