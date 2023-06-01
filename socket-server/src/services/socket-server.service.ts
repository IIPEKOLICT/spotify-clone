import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import {
  SocketEvent,
  SocketAuth,
  SocketData,
  SocketDataWithPayload,
  getSocketRoomName,
  getSocketRoomId,
  SocketBroadcastEvent,
} from '@yumasoft-spotify/socket-sdk';
import { IncomeEventsMap, OutgoingEventsMap, SocketIncomeEventHandler } from '../types';

export class SocketServerService {
  private constructor(
    private readonly socket: Socket<IncomeEventsMap, OutgoingEventsMap, OutgoingEventsMap, SocketAuth>,
  ) {}

  private log(message: string) {
    console.log(`[SOCKET][#${this.socket.id}][${this.userName}]: ${message}`);
  }

  private get userName(): string | number {
    return this.socket.data.username ?? this.socket.data.userId ?? 'Anonymous';
  }

  private send<Payload extends object | undefined = undefined>(
    event: SocketBroadcastEvent,
    data: SocketDataWithPayload<Payload>,
  ) {
    const room: string = getSocketRoomName(data.target, this.socket.data.userId);
    this.socket.broadcast.to(room).emit(event, data);
    this.log(`User (${this.userName}) send a ${event} message to room ${room}`);
  }

  [SocketEvent.AUTH](data: SocketAuth) {
    const { userId, username } = data;

    this.socket.data.userId = userId;
    this.socket.data.username = username;

    this.log(`User (${this.userName}) connected to server`);
  }

  [SocketEvent.JOIN](data: SocketData) {
    const room: string = getSocketRoomName(data.target, this.socket.data.userId);

    this.socket.join(room);
    this.socket.broadcast.to(room).emit(SocketEvent.JOINED, { username: this.userName });

    this.log(`User (${this.userName}) has been joined to the room ${room}`);
  }

  [SocketEvent.NEW](data: SocketDataWithPayload) {
    this.send(SocketEvent.NEW, data);
  }

  [SocketEvent.EDIT](data: SocketDataWithPayload) {
    this.send(SocketEvent.EDIT, data);
  }

  [SocketEvent.REMOVE](data: SocketData) {
    this.send(SocketEvent.REMOVE, {
      ...data,
      payload: {
        id: getSocketRoomId(data.target, this.socket.data.userId),
      },
    });
  }

  [SocketEvent.TYPING](data: SocketData) {
    this.send(SocketEvent.TYPING, {
      ...data,
      payload: {
        userId: getSocketRoomId(data.target, this.socket.data.userId),
        username: this.userName,
      },
    });
  }

  [SocketEvent.STOP_TYPING](data: SocketData) {
    this.send(SocketEvent.STOP_TYPING, {
      ...data,
      payload: {
        userId: getSocketRoomId(data.target, this.socket.data.userId),
        username: this.userName,
      },
    });
  }

  [SocketEvent.LEAVE](data: SocketData) {
    const room: string = getSocketRoomName(data.target, this.socket.data.userId);
    this.socket.leave(room);
    this.log(`User (${this.userName}) has been leaved the room ${room}`);
  }

  [SocketEvent.DISCONNECT]() {
    this.log(`User (${this.userName}) disconnected from the server`);
  }

  [SocketEvent.CONNECT_ERROR](error: Error) {
    this.log(`Connect Error: ${error}`);
  }

  [SocketEvent.CONNECT_FAILED](error: Error) {
    this.log(`Connect Failed: ${error}`);
  }

  static inject(server: HttpServer) {
    const io = new Server(server, { transports: ['websocket'], allowUpgrades: false });

    io.on('connection', (socket) => {
      const service: SocketServerService = new this(socket);

      for (const eventId in SocketEvent) {
        const event: SocketEvent = SocketEvent[eventId];
        const handler: SocketIncomeEventHandler | undefined = service[event]?.bind(service);

        if (handler) {
          socket.on(event, handler);
        }
      }
    });

    process.on('exit', () => {
      io.disconnectSockets(true);
      io.close();
    });
  }
}
