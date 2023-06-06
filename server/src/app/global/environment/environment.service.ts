import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentService {
  constructor(private readonly configService: ConfigService) {}

  get PORT(): string | number {
    return this.configService.get('PORT') ?? 5555;
  }

  get DATABASE_URL(): string {
    return this.configService.get('DATABASE_URL') ?? 'mongodb://localhost:27017/main';
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

  get GOOGLE_PROJECT_ID(): string {
    return this.configService.getOrThrow('GOOGLE_PROJECT_ID');
  }

  get GOOGLE_PRIVATE_KEY(): string {
    return this.configService.getOrThrow('GOOGLE_PRIVATE_KEY');
  }

  get GOOGLE_CLIENT_EMAIL(): string {
    return this.configService.getOrThrow('GOOGLE_CLIENT_EMAIL');
  }

  get GOOGLE_BUCKET_NAME(): string {
    return this.configService.getOrThrow('GOOGLE_BUCKET_NAME');
  }

  get FRONTEND_ORIGIN(): string {
    return this.configService.get('FRONTEND_ORIGIN') ?? 'http://localhost:3000';
  }
}
