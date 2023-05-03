import { Injectable } from '@nestjs/common';
import { GREETINGS } from './constants/environment';

@Injectable()
export class AppService {
  getHello(): string {
    return GREETINGS;
  }
}
