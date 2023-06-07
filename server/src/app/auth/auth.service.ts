import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { CryptographyService } from '../cryptography/cryptography.service';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { Request, Response } from 'express';
import { Cookie, HttpHeader } from '../../constants/enums';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly cryptographyService: CryptographyService,
  ) {}

  tryGetJwtTokenFromRequest(request: Request): string | null {
    const cookie: string | undefined = request.cookies[Cookie.ACCESS_TOKEN];

    if (cookie) {
      return cookie;
    }

    const header: string | string[] | undefined = request.headers[HttpHeader.AUTHORIZATION];

    if (!header) {
      return null;
    }

    if (typeof header === 'string') {
      return header.split(' ')[1];
    }

    return header[0].split(' ')[1];
  }

  private generateToken(user: UserEntity): string {
    const { _id, createdAt } = user;
    return this.jwtService.sign({ _id, createdAt });
  }

  injectJwtTokenIntoResponse(response: Response, user: UserEntity) {
    const token: string = this.generateToken(user);

    response.cookie(Cookie.ACCESS_TOKEN, token);
    response.setHeader(HttpHeader.AUTHORIZATION, `Bearer ${token}`);
  }

  removeJwtTokenFromResponse(response: Response) {
    response.cookie(Cookie.ACCESS_TOKEN, '');
    response.setHeader(HttpHeader.AUTHORIZATION, '');
  }

  async tryGetUserViaCredentials(email: string, password: string): Promise<UserEntity | undefined> {
    const user: UserEntity = await this.userService.getOne({ email: email });

    if (!(await this.cryptographyService.compare(password, user.password))) {
      return;
    }

    return user;
  }

  async tryGetUserViaJwt(payload: JwtPayloadDto): Promise<UserEntity | undefined> {
    const user: UserEntity = await this.userService.getById(payload.id);

    if (user.createdAt.getTime() !== Date.parse(payload.createdAt)) {
      return;
    }

    return user;
  }
}
