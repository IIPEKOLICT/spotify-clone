export enum Endpoint {
  USERS = 'users',
  AUTH = 'auth',
}

export enum EntityName {
  USER = 'user',
}

export enum MetadataKey {
  IS_PUBLIC_ENDPOINT = 'is-public-endpoint',
  IS_ADMIN_ENDPOINT = 'is-admin-endpoint',
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
  BAD_REQUEST = 'Bad request',
}
