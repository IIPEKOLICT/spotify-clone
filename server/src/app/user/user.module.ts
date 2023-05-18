import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { StorageModule } from '../storage/storage.module';
import { UserSubscriber } from './subscribers/user.subscriber';
import { UserMapper } from './mappers/user.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), StorageModule],
  controllers: [UserController],
  providers: [UserService, UserMapper, UserSubscriber],
  exports: [UserService, UserMapper],
})
export class UserModule {}
