import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import { SocketAuth, SocketData, SocketDataWithPayload, SocketTarget } from '../../../shared/sockets/types';
import { SocketEvent } from '../../../shared/sockets/enums';
import { IncomeEventsMap, OutgoingEventsMap, SocketIncomeEventHandler } from '../types';

export class SocketService {
  private constructor(
    private readonly socket: Socket<IncomeEventsMap, OutgoingEventsMap, OutgoingEventsMap, SocketAuth>,
  ) {}

  private log(message: string) {
    console.log(`[SOCKET][#${this.socket.id}]: ${message}`);
  }

  private getId(target: SocketTarget): number {
    return target.entityId ?? target.userId ?? this.socket.data.userId;
  }

  private getRoomName(target: SocketTarget): string {
    return `${target.place}:${target.entity}:${this.getId(target)}`;
  }

  private get userName(): string | number {
    return this.socket.data.username ?? this.socket.data.userId ?? 'Anonymous';
  }

  private sendWithPayload(data: SocketDataWithPayload, event: SocketEvent) {
    const room: string = this.getRoomName(data.target);
    this.socket.broadcast.to(room).emit(event, data.payload);
    this.log(`User (${this.userName}) send a ${event} message to room ${room}`);
  }

  private sendWithUserName(data: SocketData, event: SocketEvent) {
    const room: string = this.getRoomName(data.target);
    this.socket.broadcast.to(room).emit(event, { username: this.userName });
  }

  [SocketEvent.AUTH](data: SocketAuth) {
    const { userId, username } = data;

    this.socket.data.userId = userId;
    this.socket.data.username = username;

    this.log(`User (${this.userName}) connected to server`);
  }

  [SocketEvent.JOIN](data: SocketData) {
    const room: string = this.getRoomName(data.target);

    this.socket.join(room);
    this.socket.broadcast.to(room).emit(SocketEvent.JOINED, { username: this.userName });

    this.log(`User (${this.userName}) has been joined to the room ${room}`);
  }

  [SocketEvent.NEW](data: SocketDataWithPayload) {
    this.sendWithPayload(data, SocketEvent.NEW);
  }

  [SocketEvent.EDIT](data: SocketDataWithPayload) {
    this.sendWithPayload(data, SocketEvent.EDIT);
  }

  [SocketEvent.REMOVE](data: SocketData) {
    this.socket.broadcast.to(this.getRoomName(data.target)).emit(SocketEvent.REMOVE, { id: this.getId(data.target) });
  }

  [SocketEvent.TYPING](data: SocketData) {
    this.sendWithUserName(data, SocketEvent.TYPING);
  }

  [SocketEvent.STOP_TYPING](data: SocketData) {
    this.sendWithUserName(data, SocketEvent.STOP_TYPING);
  }

  [SocketEvent.LEAVE](data: SocketData) {
    const room: string = this.getRoomName(data.target);
    this.socket.leave(room);
    this.log(`User (${this.userName}) has been leaved the room ${room}`);
  }

  [SocketEvent.DISCONNECT]() {
    this.log(`${this.userName} disconnected from the server`);
  }

  [SocketEvent.CONNECT_ERROR](error: Error) {
    this.log(`Connect Error: ${error}`);
  }

  [SocketEvent.CONNECT_FAILED](error: Error) {
    this.log(`Connect Failed: ${error}`);
  }

  static inject(server: HttpServer) {
    const io = new Server(server);

    io.on('connection', (socket) => {
      const service: SocketService = new this(socket);

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
