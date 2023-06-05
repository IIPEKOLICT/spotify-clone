import { INestApplication } from '@nestjs/common';
import { UserService } from '../app/user/user.service';
import { UserEntity } from '../app/user/user.entity';
import { DeepPartial } from 'typeorm';
import { UserRole } from '../constants/enums';

const initialUsers: DeepPartial<UserEntity>[] = [
  {
    firstName: 'User',
    lastName: 'User',
    email: 'user@gmail.com',
    password: '12345',
    role: UserRole.USER,
  },
  {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@gmail.com',
    password: '12345',
    role: UserRole.ADMIN,
  },
  {
    firstName: 'Backend',
    lastName: 'User',
    email: 'backend@gmail.com',
    password: '12345',
    role: UserRole.ADMIN,
  },
];

export const initDatabaseHook = async (app: INestApplication) => {
  const userService = app.get(UserService);

  const usersAmount = await userService.count();

  if (usersAmount) {
    return;
  }

  await userService.createMany(initialUsers);
};
