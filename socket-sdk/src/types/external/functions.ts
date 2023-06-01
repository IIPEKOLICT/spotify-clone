export type VoidCallback = {
  (): void;
};

export type SocketSubscribeReturnType = {
  roomName: string;
  unsubscribe: VoidCallback;
};

export type SocketSubscriber<Payload extends object | undefined = undefined> = (payload: Payload) => void;

export type ExternalSocketSubscribeMethod<Payload extends object | undefined = undefined> = {
  (id: number, subscriber: SocketSubscriber<Payload>): SocketSubscribeReturnType;
};

export type ExternalSocketTriggerMethod<Payload extends object | undefined = undefined> = Payload extends undefined
  ? {
      (id: number): void;
    }
  : {
      (id: number, payload: Payload): void;
    };
