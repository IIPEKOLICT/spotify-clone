import { SocketAuth, SocketData, SocketDataWithPayload } from '../external/data';

export type IncomeEventHandler = (data: SocketAuth | SocketData | SocketDataWithPayload) => void;
export type OutgoingEventHandler = (data: object) => void;
