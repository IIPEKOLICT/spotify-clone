import { UserModel } from './models';

export type CreateUserRequestBody = Pick<UserModel, 'firstName' | 'lastName' | 'email'> & {
  password: string;
};

export type UpdateUserInfoRequestBody = Partial<CreateUserRequestBody>;

export type LoginRequestBody = Pick<UserModel, 'firstName' | 'lastName'>;
