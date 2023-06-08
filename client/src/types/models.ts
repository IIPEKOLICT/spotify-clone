import { UserStatus } from '@yumasoft-spotify/socket-sdk';
import { UserRole } from '../constants/enums';

export type EntityModel = {
  createdAt: Date;
  updatedAt?: Date;
};

export type UserModel = EntityModel & {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePicture: string | null;
  role: UserRole;
  status: UserStatus;
};
