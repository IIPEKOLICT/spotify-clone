import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';

export const User = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request['user'];

  if (user && user instanceof UserEntity) {
    return user;
  }

  throw Error('User is missing');
});
