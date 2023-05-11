export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
  HEAD = 'HEAD',
  ANY = 'ANY',
}

export enum AuthType {
  LOGIN = 'login',
  REGISTRATION = 'registration',
}

export enum RoutePath {
  HOME = '/',
  LOGIN = '/login',
  REGISTRATION = '/registration',
  DEFAULT = '*',
}
