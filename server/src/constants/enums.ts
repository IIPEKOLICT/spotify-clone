export enum ENDPOINT {
  USERS = 'users',
  AUTH = 'auth',
  ROLES = 'roles',
}

export enum ENTITY {
  USER = 'user',
  ROLE = 'role',
}

export enum METADATA_KEY {
  IS_PUBLIC_ENDPOINT = 'is-public-endpoint',
  REQUIRED_PERMISSIONS = 'required-permissions',
}

export enum PERMISSION {
  CAN_ADD_SONGS = 'canAddSongs',
  CAN_ADD_PLAYLISTS = 'canAddPlaylists',
  CAN_OPEN_ADMIN_PANEL = 'canOpenAdminPanel',
}

export enum API_OPERATION {
  MAIN_STATUS = 'get backend status',

  AUTH_REFRESH_TOKEN = 'refresh JWT token',
  AUTH_LOGIN = 'login',
  AUTH_REGISTER = 'register new user',

  USERS_GET_ALL = 'get all users',
}

export enum HTTP_HEADER {
  AUTHORIZATION = 'Authorization',
}

export enum EXCEPTION_MESSAGE {
  UNKNOWN_EXCEPTION = 'Internal server exception',
  UNAUTHORIZED = 'Unauthorized',
}
