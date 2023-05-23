import { SocketAuth } from '../../types/external/data';
import { IClientServiceInternal, IInterceptorService } from '../internal/services';
import { DynamicAPI } from '../../types/external/dynamic';

export interface IInterceptorServiceExternal extends Pick<IInterceptorService, 'add' | 'remove'> {}

export interface IClientService extends IClientServiceInternal {
  readonly dynamic: DynamicAPI;
  readonly interceptors: IInterceptorServiceExternal;
  readonly isConnected: boolean;

  auth(authBlock?: SocketAuth): void;
  logout(): void;
  onInit(auth?: SocketAuth | boolean): void;
  onDestroy(): void;
}
