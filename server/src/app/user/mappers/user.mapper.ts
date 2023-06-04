import { Injectable } from '@nestjs/common';
import { UserEntity } from '../user.entity';
import { StorageService } from '../../storage/storage.service';

@Injectable()
export class UserMapper {
  constructor(private readonly storageService: StorageService) {}

  mapOne(user: UserEntity): UserEntity {
    delete user.password;
    delete user.profilePicturePath;
    return user;
  }

  mapMany(users: UserEntity[]): UserEntity[] {
    return users.map((user: UserEntity) => this.mapOne(user));
  }
}
