export enum Endpoint {
  USERS = 'users',
  AUTH = 'auth',
  ROLES = 'roles',
}

export enum EntityName {
  USER = 'user',
  ROLE = 'role',
}

export enum MetadataKey {
  IS_PUBLIC_ENDPOINT = 'is-public-endpoint',
  REQUIRED_PERMISSIONS = 'required-permissions',
}

export enum Permission {
  CAN_ADD_SONGS = 'canAddSongs',
  CAN_ADD_PLAYLISTS = 'canAddPlaylists',
  CAN_OPEN_ADMIN_PANEL = 'canOpenAdminPanel',
}

export enum ApiOperationDescription {
  MAIN_STATUS = 'get backend status',

  AUTH_REFRESH_TOKEN = 'refresh JWT token',
  AUTH_LOGIN = 'login',
  AUTH_REGISTER = 'register new user',

  USERS_GET_ALL = 'get all users',
}

export enum Cookie {
  ACCESS_TOKEN = 'access-token',
}

export enum HttpHeader {
  AUTHORIZATION = 'Authorization',
}

export enum ErrorMessage {
  UNKNOWN_EXCEPTION = 'Internal server exception',
  UNAUTHORIZED = 'Unauthorized',
}
