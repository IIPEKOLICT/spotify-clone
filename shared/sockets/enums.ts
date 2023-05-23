export enum SocketPlace {
  USER_PAGE = 'user-page',
}

export enum SocketEntity {
  USER_STATUS = 'user-status',
  POST = 'post',
  AUDIO = 'audio',
}

export enum SocketEvent {
  AUTH = 'auth',
  JOIN = 'join',
  JOINED = 'joined',
  NEW = 'new',
  EDIT = 'edit',
  REMOVE = 'remove',
  TYPING = 'typing',
  STOP_TYPING = 'stop_typing',
  LEAVE = 'leave',
  DISCONNECT = 'disconnect',
  CONNECT_ERROR = 'connect_error',
  CONNECT_FAILED = 'connect_failed',
}
