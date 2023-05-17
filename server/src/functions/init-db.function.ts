import { INestApplication } from '@nestjs/common';
import { UserService } from '../app/user/user.service';
import { UserEntity } from '../app/user/user.entity';
import { DeepPartial } from 'typeorm';
import { UserRole } from '../constants/enums';

export const initDatabase = async (app: INestApplication) => {
  const userService = app.get(UserService);

  const usersAmount = await userService.count();

  if (usersAmount) {
    return;
  }

  const users: DeepPartial<UserEntity>[] = [
    {
      email: 'user@gmail.com',
      password: '12345',
    },
    {
      email: 'admin@gmail.com',
      password: '12345',
      role: UserRole.ADMIN,
    },
  ];

  await userService.createMany(users);
};
