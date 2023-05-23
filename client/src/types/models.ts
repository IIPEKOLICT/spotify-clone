export type UserModel = {
  id: number | null;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePicture: string;
  role: RoleModel;
  [key: string]: any;
};

export type RoleModel = {
  id: number | null;
  name: string;
  canAddSongs: boolean;
  canAddPlaylists: boolean;
  canOpenAdminPanel: boolean;
};

export type CustomItem = {
  [key: string]: React.ReactElement;
};