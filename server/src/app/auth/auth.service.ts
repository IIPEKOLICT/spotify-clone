import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { CryptographyService } from '../global/cryptography/cryptography.service';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { Request, Response } from 'express';
import { Cookie } from '../../constants/enums';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly cryptographyService: CryptographyService,
  ) {}

  tryGetJwtTokenFromRequestCookies(request: Request): string | null {
    return request.cookies[Cookie.ACCESS_TOKEN] ?? null;
  }

  private generateToken(user: UserEntity): string {
    const { email, id, role } = user;
    return this.jwtService.sign({ email, id, role });
  }

  injectJwtTokenIntoResponseCookies(response: Response, user: UserEntity) {
    response.cookie(Cookie.ACCESS_TOKEN, this.generateToken(user));
  }

  async tryGetUserViaCredentials(email: string, password: string): Promise<UserEntity | undefined> {
    const user: UserEntity = await this.userService.getOne({ email: email });

    if (!(await this.cryptographyService.compare(password, user.password))) {
      return;
    }

    return user;
  }

  async tryGetUserViaJwt(payload: JwtPayloadDto): Promise<UserEntity | undefined> {
    const user: UserEntity = await this.userService.getOne({ email: payload.email });

    if (!(user.role === payload.role)) {
      return;
    }

    return user;
  }
}
