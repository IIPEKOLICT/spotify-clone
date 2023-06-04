import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserSubscriber } from './subscribers/user.subscriber';
import { UserMapper } from './mappers/user.mapper';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), CryptographyModule, FirebaseModule],
  controllers: [UserController],
  providers: [UserService, UserMapper, UserSubscriber],
  exports: [UserService, UserMapper],
})
export class UserModule {}
