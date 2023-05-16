import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { MetadataKey } from '../../../constants/enums';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isAdminEndpoint = this.reflector.getAllAndOverride<boolean>(MetadataKey.IS_ADMIN_ENDPOINT, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!isAdminEndpoint) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    return !!user?.isAdmin;
  }
}
