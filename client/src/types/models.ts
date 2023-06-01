import { ReactElement } from 'react';
import { UserStatus } from '@yumasoft-spotify/socket-sdk';
import { UserRole } from '../constants/enums';

export type EntityModel = {
  createdAt: Date;
  updatedAt: Date | null;
};

export type UserModel = EntityModel & {
  id: number | null;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePicture: string;
  role: UserRole;
  status: UserStatus;
  [key: string]: any;
};

export type CustomItem = {
  [key: string]: ReactElement;
};
