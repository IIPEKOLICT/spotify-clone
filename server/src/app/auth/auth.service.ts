import { Injectable } from '@nestjs/common';
import { UserService } from '../user/services/user.service';
import { UserEntity } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { CryptographyService } from '../global/cryptografy/cryptography.service';
import { JwtPayloadDto } from './dto/jwt-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly cryptographyService: CryptographyService,
  ) {}

  async tryGetUserViaCredentials(email: string, password: string): Promise<UserEntity | undefined> {
    const user: UserEntity = await this.userService.getOne({ email: email });

    if (!(await this.cryptographyService.compare(password, user.password))) {
      return;
    }

    return user;
  }

  async tryGetUserViaJwt(payload: JwtPayloadDto): Promise<UserEntity | undefined> {
    const user: UserEntity = await this.userService.getOne({ email: payload.email });

    if (!(user.role.id === payload.role.id)) {
      return;
    }

    return user;
  }

  generateToken(user: UserEntity): string {
    const { email, id, role } = user;
    return this.jwtService.sign({ email, id, role });
  }
}
