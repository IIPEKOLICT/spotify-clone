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

export enum NavItem {
  PROFILE = 'Profile',
  NEWS = 'News',
  MESSENGER = 'Messenger',
  FRIENDS = 'Friends',
  PHOTOS = 'Photos',
  MUSIC = 'Music',
  VIDEOS = 'Videos',
}

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export enum SessionStorageKey {
  ACCESS_TOKEN = 'access-token',
}

export enum HttpHeader {
  AUTHORIZATION = 'Authorization',
}
