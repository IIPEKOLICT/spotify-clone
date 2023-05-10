import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserEntity } from '../../user/entities/user.entity';
import { UnauthorizedError } from '../../../errors/unauthorized.error';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(username: string, password: string): Promise<UserEntity> {
    const user: UserEntity | undefined = await this.authService.tryGetUserViaCredentials(username, password);

    if (!user) {
      throw new UnauthorizedError('Invalid login or password');
    }

    return user;
  }
}
