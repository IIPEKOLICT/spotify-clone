import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { UserEntity } from '../../user/entities/user.entity';
import { AuthService } from '../auth.service';
import { EnvironmentService } from '../../global/environment/environment.service';
import { JWT_IGNORE_EXPIRATION } from '../../../constants/configuration';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';
import { UnauthorizedError } from '../../../errors/unauthorized.error';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly environmentService: EnvironmentService, private readonly authService: AuthService) {
    super({
      jwtFromRequest: authService.tryGetJwtTokenFromRequestCookies,
      ignoreExpiration: JWT_IGNORE_EXPIRATION,
      secretOrKey: environmentService.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayloadDto): Promise<UserEntity> {
    const user: UserEntity | undefined = await this.authService.tryGetUserViaJwt(payload);

    if (!user) {
      throw new UnauthorizedError('Invalid JWT token data or JWT token is missing');
    }

    return user;
  }
}
