import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { EnvironmentService } from '../environment/environment.service';

@Injectable()
export class CryptographyService {
  constructor(private readonly environmentService: EnvironmentService) {}

  async compare(encoded: string, decoded: string): Promise<boolean> {
    return bcrypt.compare(encoded, decoded);
  }

  async hash(data: string): Promise<string> {
    return bcrypt.hash(data, this.environmentService.BCRYPT_SALT);
  }
}
