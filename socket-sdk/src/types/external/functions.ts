export type VoidCallback = {
  (): void;
};

export type SocketSubscribeReturnType = {
  roomName: string;
  unsubscribe: VoidCallback;
};

export type SocketSubscriber<Payload extends object | undefined = undefined> = (payload: Payload) => void;

export type ExternalSocketSubscribeMethod<Payload extends object | undefined = undefined> = {
  (id: string, subscriber: SocketSubscriber<Payload>): SocketSubscribeReturnType;
};

export type ExternalSocketTriggerMethod<Payload extends object | undefined = undefined> = Payload extends undefined
  ? {
      (id: string): void;
    }
  : {
      (id: string, payload: Payload): void;
    };
