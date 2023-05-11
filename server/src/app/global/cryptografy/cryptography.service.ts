import { compare, hash } from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { EnvironmentService } from '../environment/environment.service';

@Injectable()
export class CryptographyService {
  constructor(private readonly environmentService: EnvironmentService) {}

  async compare(encoded: string, decoded: string): Promise<boolean> {
    return compare(encoded, decoded);
  }

  async hash(data: string): Promise<string> {
    return hash(data, this.environmentService.BCRYPT_SALT);
  }
}
