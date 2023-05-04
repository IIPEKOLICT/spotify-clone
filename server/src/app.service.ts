import { Injectable } from '@nestjs/common';
import { HeathCheckDto } from './shared/dto/heath-check.dto';

@Injectable()
export class AppService {
  healthCheck(): HeathCheckDto {
    return { status: 'ok' };
  }
}
