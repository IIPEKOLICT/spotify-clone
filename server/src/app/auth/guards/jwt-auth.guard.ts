import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { MetadataKey } from '../../../constants/enums';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublicEndpoint = this.reflector.getAllAndOverride<boolean>(MetadataKey.IS_PUBLIC_ENDPOINT, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublicEndpoint) {
      return true;
    }

    return super.canActivate(context);
  }
}
