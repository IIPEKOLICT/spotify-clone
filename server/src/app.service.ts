import { Injectable } from '@nestjs/common';
import { EnvironmentService } from './modules/global/environment/environment.service';

@Injectable()
export class AppService {
  constructor(private readonly environmentService: EnvironmentService) {}

  getHello(): string {
    return this.environmentService.GREETING;
  }
}
