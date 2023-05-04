import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentService {
  constructor(private readonly configService: ConfigService) {}

  get GREETING(): string {
    return this.configService.get('GREETING') ?? 'Backend served locally';
  }

  get PORT(): string | number {
    return this.configService.get('PORT') ?? 5555;
  }

  get DATABASE_URL(): string {
    return this.configService.get('DATABASE_URL') ?? 'postgres://user:password@db:5432/dbname';
  }
}
