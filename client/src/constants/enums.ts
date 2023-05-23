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
  PROFILE = '/profile',
  USER = '/profile/:id',
  NEWS = '/news',
  MESSENGER = '/messenger',
  FRIENDS = '/friends',
  PHOTOS = '/photos',
  MUSIC = '/music',
  VIDEOS = '/videos',
  DEFAULT = '*',
}
