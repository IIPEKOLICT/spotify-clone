import { IServerService } from '../../interfaces/external/services';
import { Socket } from 'socket.io';
import { IncomeEventsMap, OutgoingEventsMap } from '../../types/internal/data';
import { SocketAuth, SocketData, SocketDataWithPayload } from '../../types/external/data';
import { SocketBroadcastEvent } from '../../types/external/events';
import { getRoomName } from '../../functions/external/getters';
import { SOCKET_BROADCAST_EVENTS } from '../../constants/internal/events';
import { SocketEvent } from '../../enums/external/events';

export class ServerService implements IServerService {
  private constructor(
    private readonly socket: Socket<IncomeEventsMap, OutgoingEventsMap, OutgoingEventsMap, SocketAuth>,
  ) {
    SOCKET_BROADCAST_EVENTS.forEach((event: SocketBroadcastEvent) => {
      this[event] = this.generateBroadcastEvent(event).bind(this);
    });
  }

  private log(message: string) {
    console.log(`[SOCKET][#${this.socket.id}][${this.userName}]: ${message}`);
  }

  private get userName(): string {
    return this.socket.data.username ?? this.socket.data.userId ?? 'Anonymous';
  }

  private send<Payload extends object | undefined = undefined>(
    event: SocketBroadcastEvent,
    data: SocketDataWithPayload<Payload>,
  ) {
    const room: string = getRoomName(data.target, this.socket.data.userId);
    this.socket.broadcast.to(room).emit(event, data);
    this.log(`User (${this.userName}) send ${event} message to room ${room}`);
  }

  private generateBroadcastEvent(event: SocketBroadcastEvent) {
    return (data: SocketDataWithPayload) => {
      this.send(event, data);
    };
  }

  [SocketEvent.AUTH](data: SocketAuth) {
    const { userId, username } = data;

    this.socket.data.userId = userId;
    this.socket.data.username = username;

    this.log(`User (${this.userName}) connected to server`);
  }

  [SocketEvent.JOIN](data: SocketData) {
    const room: string = getRoomName(data.target, this.socket.data.userId);

    this.socket.join(room);
    this.socket.broadcast.to(room).emit(SocketEvent.JOINED, this.socket.data);

    this.log(`User (${this.userName}) has been joined to the room ${room}`);
  }

  [SocketEvent.LEAVE](data: SocketData) {
    const room: string = getRoomName(data.target, this.socket.data.userId);
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

  static create(socket: any): ServerService {
    return new this(socket);
  }
}
