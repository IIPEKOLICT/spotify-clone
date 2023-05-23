import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentService {
  constructor(private readonly configService: ConfigService) {}

  get PORT(): string | number {
    return this.configService.get('PORT') ?? 5555;
  }

  get DATABASE_URL(): string {
    return this.configService.get('DATABASE_URL') ?? 'postgres://user:password@db:5432/dbname';
  }

  get JWT_SECRET(): string {
    return this.configService.get('JWT_SECRET') ?? '12345';
  }

  get BCRYPT_SALT(): number {
    return this.configService.get('BCRYPT_SALT') ?? 5;
  }

  get SOCKET_SERVER_URL(): string {
    return this.configService.get('SOCKET_SERVER_URL') ?? 'ws://localhost:8888';
  }
}
