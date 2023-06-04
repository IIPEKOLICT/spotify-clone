import { Injectable } from '@nestjs/common';
import { UserEntity } from '../user.entity';
import { FirebaseStorageService } from '../../firebase/services/firebase-storage.service';
import { Coroutine } from '@evgenii-shcherbakov/coroutine';

@Injectable()
export class UserMapper {
  constructor(private readonly firebaseStorageService: FirebaseStorageService) {}

  async mapOne(user: UserEntity): Promise<UserEntity> {
    if (user.profilePicturePath) {
      user.profilePicture = await this.firebaseStorageService.getLink(user.profilePicturePath);
    }

    delete user.password;
    delete user.profilePicturePath;
    return user;
  }

  async mapMany(users: UserEntity[]): Promise<UserEntity[]> {
    return Coroutine.launchArr(users, async (user: UserEntity) => this.mapOne(user));
  }
}
