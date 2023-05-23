import { Global, Module } from '@nestjs/common';
import { UserPageSocketService } from './services/user-page-socket.service';

@Global()
@Module({
  providers: [UserPageSocketService],
  exports: [UserPageSocketService],
})
export class SocketModule {}
