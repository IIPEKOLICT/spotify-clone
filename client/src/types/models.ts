export type UserModel = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: RoleModel;
};

export type RoleModel = {
  id: number;
  name: string;
  canAddSongs: boolean;
  canOpenAdminPanel: boolean;
};
