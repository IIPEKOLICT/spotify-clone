import { IInterceptorService } from '../../interfaces/internal/services';
import { SocketSubscribeReturnType } from '../../types/external/functions';
import { ISocketInterceptor } from '../../interfaces/external/custom';

export class InterceptorService implements IInterceptorService {
  private readonly interceptors: ISocketInterceptor[] = [];

  add(...interceptors: ISocketInterceptor[]): void {
    this.interceptors.push(...interceptors);
  }

  clear(): void {
    this.interceptors.filter(() => true);
  }

  onSubscribe(subscribeReturn: SocketSubscribeReturnType): void {
    this.interceptors.forEach((interceptor: ISocketInterceptor) => interceptor.onSubscribe(subscribeReturn));
  }

  remove(...interceptors: ISocketInterceptor[]): void {
    this.interceptors.filter((existsInterceptor: ISocketInterceptor) => {
      return interceptors.every((interceptor: ISocketInterceptor) => interceptor !== existsInterceptor);
    });
  }
}
