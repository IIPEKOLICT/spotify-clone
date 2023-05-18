import { Injectable } from '@nestjs/common';
import { UserEntity } from '../user.entity';

@Injectable()
export class UserMapper {
  mapOne(user: UserEntity): UserEntity {
    delete user.password;
    return user;
  }

  mapMany(users: UserEntity[]): UserEntity[] {
    return users.map((user: UserEntity) => this.mapOne(user));
  }
}
