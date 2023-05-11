import { INestApplication } from '@nestjs/common';
import { RoleService } from '../app/user/services/role.service';
import { UserService } from '../app/user/services/user.service';
import { RoleEntity } from '../app/user/entities/role.entity';
import { PERMISSION } from '../constants/enums';
import { UserEntity } from '../app/user/entities/user.entity';

export const initDatabase = async (app: INestApplication) => {
  const roleService = app.get(RoleService);
  const userService = app.get(UserService);

  const rolesAmount = await roleService.count();
  const usersAmount = await userService.count();

  if (rolesAmount || usersAmount) {
    return;
  }

  const roles: Partial<RoleEntity>[] = [
    {
      name: 'user',
      [PERMISSION.CAN_ADD_SONGS]: false,
      [PERMISSION.CAN_ADD_PLAYLISTS]: true,
      [PERMISSION.CAN_OPEN_ADMIN_PANEL]: false,
    },
    {
      name: 'singer',
      [PERMISSION.CAN_ADD_SONGS]: true,
      [PERMISSION.CAN_ADD_PLAYLISTS]: true,
      [PERMISSION.CAN_OPEN_ADMIN_PANEL]: false,
    },
    {
      name: 'admin',
      [PERMISSION.CAN_ADD_SONGS]: true,
      [PERMISSION.CAN_ADD_PLAYLISTS]: true,
      [PERMISSION.CAN_OPEN_ADMIN_PANEL]: true,
    },
  ];

  await roleService.createMany(roles);

  const userRole = await roleService.getOne({ name: 'user' });
  const singerRole = await roleService.getOne({ name: 'singer' });
  const adminRole = await roleService.getOne({ name: 'admin' });

  const users: Partial<UserEntity>[] = [
    {
      email: 'user@gmail.com',
      password: '12345',
      role: userRole,
    },
    {
      email: 'singer@gmail.com',
      password: '12345',
      role: singerRole,
    },
    {
      email: 'admin@gmail.com',
      password: '12345',
      role: adminRole,
    },
  ];

  await userService.createMany(users);
};
